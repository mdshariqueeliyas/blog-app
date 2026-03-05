# Java Introduction to Multithreading – PPT Notes for Students

Study notes for each topic: short definition, example, practice question, and MCQs.

---

## 1. Differences Between Multiple Processes and Multiple Threads

**Notes:**  
A **process** is an independent program in execution with its own memory space, resources, and address space. Processes do not share memory by default; communication between them (IPC) is more expensive. A **thread** is a lightweight unit of execution within a process. Multiple threads within the same process share the process’s memory (heap), code, and files, but each thread has its own stack and program counter. Threads are cheaper to create and switch than processes; however, because they share memory, care must be taken to avoid race conditions and ensure proper synchronization.

| Basis | Process | Thread |
|-------|---------|--------|
| **Definition** | Independent program with its own memory space | Lightweight unit of execution within a process |
| **Memory** | Isolated address space | Shares heap and resources with other threads in same process |
| **Creation/Switch** | Heavier (more OS overhead) | Lighter (less overhead) |
| **Communication** | IPC (pipes, sockets, shared memory) | Shared variables (requires synchronization) |
| **Failure** | One process crash does not affect others | One thread crash can terminate the whole process |
| **Use case** | Separate applications, isolation | Concurrency within one application (e.g., UI + I/O) |

**Example:**
```java
// Multiple threads in one process - they share the same JVM and heap
public class ProcessVsThread {
    static int sharedCounter = 0;  // Shared by all threads in this process

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> sharedCounter++);
        Thread t2 = new Thread(() -> sharedCounter++);
        t1.start();
        t2.start();
        // Both threads access sharedCounter - need synchronization in real code
        System.out.println("Threads share memory in same process");
    }
}
```

**Practice:**  
In your own words, list two advantages of using threads over multiple processes when building a single application that does both network I/O and UI updates.

---

### MCQs – Processes vs Threads

1. **Threads within the same process typically share:**  
   (a) Nothing; each has isolated memory  
   (b) Heap memory, code, and open files; each has its own stack  
   (c) Only the code segment  
   (d) Only the stack  

2. **Creating and switching between threads is generally:**  
   (a) Heavier than processes  
   (b) Lighter than processes (less OS overhead)  
   (c) The same as processes  
   (d) Not supported in Java  

3. **If one thread in a process throws an uncaught exception and it propagates out of run(), the typical result is:**  
   (a) Only that thread stops  
   (b) The entire process (JVM) can terminate if it’s the main thread or not handled  
   (c) All other threads are automatically stopped  
   (d) The JVM always ignores it  

4. **Inter-Process Communication (IPC) is needed when:**  
   (a) Two threads in the same process need to share a variable  
   (b) Two separate processes need to exchange data  
   (c) A thread wants to call another thread’s method  
   (d) Using multiple cores in one process  

5. **A key disadvantage of threads compared to processes is:**  
   (a) Threads cannot run in parallel  
   (b) Shared memory can lead to race conditions; synchronization is required  
   (c) Threads are slower than processes  
   (d) Threads cannot share the heap  

6. **In Java, all threads of a program run inside:**  
   (a) Different JVM processes  
   (b) The same JVM process  
   (c) The operating system kernel only  
   (d) Separate address spaces  

7. **Which statement is true?**  
   (a) A process can have only one thread  
   (b) A process can have multiple threads; the main method runs in the main thread  
   (c) Threads and processes are the same in Java  
   (d) Multiple processes always share the same heap in the JVM  

8. **Choosing threads over multiple processes is often better when:**  
   (a) You need strong isolation between components  
   (b) You need concurrent execution within one app with shared data and lower overhead  
   (c) You never need to share data  
   (d) The OS does not support processes  

---

## 2. Thread States

**Notes:**  
A thread in Java can be in one of these states (from `Thread.State` enum): **NEW** (created but not started), **RUNNABLE** (executing or ready to run, waiting for CPU), **BLOCKED** (waiting to acquire a monitor lock), **WAITING** (waiting indefinitely for another thread, e.g. `wait()`), **TIMED_WAITING** (waiting for a specified time, e.g. `sleep(ms)` or `wait(timeout)`), and **TERMINATED** (thread has finished execution). Transitions occur when we call `start()`, when a thread acquires or releases locks, when it enters `wait()`/`notify()`, or when `run()` returns.

**Example:**
```java
public class ThreadStatesDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(1000);  // TIMED_WAITING
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        System.out.println(t.getState());  // NEW
        t.start();
        System.out.println(t.getState());  // RUNNABLE or TIMED_WAITING
        t.join();
        System.out.println(t.getState());  // TERMINATED
    }
}
```

**Practice:**  
Write a short program that creates a thread, prints its state before `start()`, after `start()`, and after `join()`. Name the states you see.

---

### MCQs – Thread States

1. **When a thread is created with `new Thread(...)` but `start()` is not yet called, its state is:**  
   (a) RUNNABLE  
   (b) NEW  
   (c) WAITING  
   (d) BLOCKED  

2. **A thread in RUNNABLE state is:**  
   (a) Always actually executing on a CPU  
   (b) Either executing or ready to run (waiting for CPU)  
   (c) Waiting for I/O  
   (d) Blocked on a lock  

3. **When a thread calls `Thread.sleep(5000)`, it enters:**  
   (a) BLOCKED  
   (b) WAITING  
   (c) TIMED_WAITING  
   (d) TERMINATED  

4. **When a thread has finished its `run()` method, its state becomes:**  
   (a) RUNNABLE  
   (b) WAITING  
   (c) TERMINATED  
   (d) BLOCKED  

5. **A thread is in BLOCKED state when it is:**  
   (a) Sleeping  
   (b) Waiting to acquire a monitor lock held by another thread  
   (c) In the middle of execution  
   (d) Just created  

6. **What is the output of the following code?**
   ```java
   Thread t = new Thread(() -> {});
   System.out.print(t.getState() + " ");
   t.start();
   System.out.println(t.getState());
   ```
   (a) NEW RUNNABLE  
   (b) RUNNABLE TERMINATED  
   (c) NEW TERMINATED  
   (d) RUNNABLE RUNNABLE  

7. **Which method can transition a thread from NEW to RUNNABLE?**  
   (a) run()  
   (b) start()  
   (c) wait()  
   (d) sleep()  

8. **WAITING and TIMED_WAITING differ in that:**  
   (a) WAITING is for I/O, TIMED_WAITING for locks  
   (b) WAITING has no timeout; TIMED_WAITING waits for a bounded time  
   (c) Only TIMED_WAITING is a valid state  
   (d) They are the same in Java  

---

## 3. Creating Threads

**Notes:**  
In Java you can create a thread in two main ways: (1) **Extend `Thread`**: define a class that extends `Thread` and override `run()`, then create an instance and call `start()`. (2) **Implement `Runnable`**: implement the `Runnable` interface (define `run()`), then pass the instance to a `Thread` constructor and call `start()`. Prefer `Runnable` when you want to avoid single inheritance or share the same run logic with multiple threads. Only calling `start()` starts the new thread; calling `run()` directly just runs the code in the current thread.

**Example:**
```java
// Way 1: Extend Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// Way 2: Implement Runnable (preferred when you need to extend another class)
class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running: " + Thread.currentThread().getName());
    }
}

public class CreatingThreads {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start();  // Starts new thread

        Thread t2 = new Thread(new MyTask());
        t2.start();

        // Lambda is also a Runnable
        Thread t3 = new Thread(() -> System.out.println("Lambda: " + Thread.currentThread().getName()));
        t3.start();
    }
}
```

**Practice:**  
Create two threads using `Runnable`: one prints "A" five times, the other prints "B" five times. Run the program a few times and observe the interleaving of output.

---

### MCQs – Creating Threads

1. **To begin execution of a new thread, you must call:**  
   (a) run()  
   (b) start()  
   (c) execute()  
   (d) begin()  

2. **If you call `run()` instead of `start()` on a Thread object:**  
   (a) A new thread is always created  
   (b) The run() method runs in the current thread; no new thread is created  
   (c) Compilation error  
   (d) The thread is immediately terminated  

3. **Implementing Runnable is often preferred over extending Thread because:**  
   (a) Runnable is faster  
   (b) Your class can extend another class and still be used as a thread task  
   (c) Runnable is required for all threads  
   (d) Thread cannot override run()  

4. **Which of the following is valid for creating a thread?**  
   (a) new Thread().start();  
   (b) new Thread(() -> {}).run();  
   (c) new Thread(() -> {}).start();  
   (d) new Runnable().start();  

5. **What is the output of this code?**
   ```java
   Thread t = new Thread(() -> System.out.print("X"));
   t.run();
   t.run();
   System.out.print("Y");
   ```
   (a) XXY  
   (b) XY  
   (c) YXX  
   (d) XYX  

6. **How many threads are typically active (including main) when you do `new Thread(r).start()` in main?**  
   (a) 1  
   (b) 2  
   (c) 0  
   (d) Depends on the JVM  

7. **The run() method of Thread/Runnable:**  
   (a) Must be called by the programmer to start the thread  
   (b) Is invoked by the JVM when the thread is scheduled after start()  
   (c) Can only be called once  
   (d) Takes a parameter for thread name  

8. **Which creates a new thread of execution?**  
   (a) new MyThread().run();  
   (b) new Thread(new MyRunnable()).start();  
   (c) new MyRunnable().run();  
   (d) Thread.currentThread().run();  

---

## 4. Interrupting Threads

**Notes:**  
**Interruption** is a cooperative mechanism to signal a thread that it should stop what it’s doing (e.g. exit a long loop or wake from sleep). One thread calls `interrupt()` on another thread. The interrupted thread does not stop automatically; it must check the interrupt status (e.g. `Thread.interrupted()` or `Thread.currentThread().isInterrupted()`) or react to `InterruptedException`. When a thread is blocked in `sleep()`, `wait()`, or similar, interrupt causes `InterruptedException` to be thrown. The thread should handle it (e.g. by cleaning up and returning from `run()`) and often restores the interrupt flag with `Thread.currentThread().interrupt()` if it doesn’t rethrow.

**Example:**
```java
public class InterruptDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                System.out.println("Working...");
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    System.out.println("Interrupted during sleep");
                    Thread.currentThread().interrupt();  // Restore interrupt status
                    break;
                }
            }
        });
        t.start();
        Thread.sleep(1500);
        t.interrupt();  // Signal the thread to stop
        t.join();
    }
}
```

**Practice:**  
Write a thread that prints numbers 1 to 100 with a short sleep between each. From the main thread, interrupt it after 2 seconds. Ensure the worker thread stops cleanly when interrupted (handle InterruptedException and/or check isInterrupted()).

---

### MCQs – Interrupting Threads

1. **Calling `interrupt()` on a thread:**  
   (a) Immediately terminates that thread  
   (b) Sets an interrupt flag and can wake the thread from sleep/wait; the thread must cooperate by checking or handling InterruptedException  
   (c) Is not allowed in Java  
   (d) Only works if the thread is in RUNNABLE state  

2. **When a thread is blocked in `Thread.sleep()` and another thread calls `interrupt()` on it:**  
   (a) Nothing happens  
   (b) InterruptedException is thrown in the sleeping thread  
   (c) The thread is killed  
   (d) sleep() returns normally  

3. **`Thread.interrupted()`:**  
   (a) Returns true for any thread that was ever interrupted  
   (b) Returns true if the current thread has been interrupted, and clears the interrupt status  
   (c) Interrupts the current thread  
   (d) Throws InterruptedException  

4. **Why might a thread call `Thread.currentThread().interrupt()` inside a catch block for InterruptedException?**  
   (a) To stop the JVM  
   (b) To restore the interrupt status so higher-level code can see that interruption occurred  
   (c) To interrupt another thread  
   (d) It is not recommended  

5. **What is the output of this code?**
   ```java
   Thread t = new Thread(() -> {
       try {
           Thread.sleep(5000);
       } catch (InterruptedException e) {
           System.out.print("Caught ");
       }
       System.out.print(Thread.currentThread().isInterrupted());
   });
   t.start();
   t.interrupt();
   t.join();
   ```
   (a) Caught true  
   (b) Caught false  
   (c) true  
   (d) No output  

6. **A thread that ignores interrupt status and never checks isInterrupted() or handles InterruptedException:**  
   (a) Cannot be interrupted  
   (b) Can still be interrupted; the interrupt flag is set but the thread may keep running until it checks or blocks in an interruptible method  
   (c) Will always throw InterruptedException  
   (d) Is automatically stopped by the JVM  

7. **Which method can throw InterruptedException?**  
   (a) interrupt()  
   (b) Thread.sleep(long)  
   (c) isInterrupted()  
   (d) start()  

8. **After catching InterruptedException, a common practice is to:**  
   (a) Ignore it and continue  
   (b) Restore interrupt status and/or exit the run loop so the thread can terminate  
   (c) Call interrupt() on all other threads  
   (d) Never use sleep() again  

---

## 5. Thread Priorities

**Notes:**  
Each thread has a **priority** (integer, typically 1–10). In Java, `Thread.MIN_PRIORITY` is 1, `Thread.NORM_PRIORITY` is 5, and `Thread.MAX_PRIORITY` is 10. The scheduler may give preference to higher-priority threads, but **priority is a hint**; the JVM and OS are not required to strictly enforce it. Setting a high priority does not guarantee a thread runs first or more often; it depends on the platform. Use priorities for soft hints (e.g. UI thread slightly higher), not for correctness. Avoid relying on priority alone for synchronization or ordering.

**Example:**
```java
public class ThreadPriorityDemo {
    public static void main(String[] args) {
        Thread low = new Thread(() -> {
            for (int i = 0; i < 5; i++)
                System.out.println("Low priority");
        });
        Thread high = new Thread(() -> {
            for (int i = 0; i < 5; i++)
                System.out.println("High priority");
        });
        low.setPriority(Thread.MIN_PRIORITY);   // 1
        high.setPriority(Thread.MAX_PRIORITY);  // 10
        low.start();
        high.start();
        // Order of output is not guaranteed; priority is only a hint
    }
}
```

**Practice:**  
Create three threads with priorities MIN, NORM, and MAX, each printing its name and priority 3 times. Run the program several times and note whether the order of output is always the same. Why or why not?

---

### MCQs – Thread Priorities

1. **Thread priority in Java is:**  
   (a) A strict guarantee that higher-priority threads always run first  
   (b) A hint to the scheduler; behavior is platform-dependent  
   (c) Only 0 or 1  
   (d) Set only by the JVM  

2. **The default priority of a new thread is:**  
   (a) Same as the thread that created it (often NORM_PRIORITY = 5)  
   (b) Always 10  
   (c) Always 1  
   (d) Random  

3. **Thread.MIN_PRIORITY and Thread.MAX_PRIORITY have values:**  
   (a) 0 and 10  
   (b) 1 and 10  
   (c) 0 and 100  
   (d) 1 and 100  

4. **Setting a thread’s priority to MAX_PRIORITY ensures:**  
   (a) It always runs before other threads  
   (b) It gets more CPU time on all platforms  
   (c) It is only a hint; the scheduler may not strictly follow it  
   (d) The program will not compile  

5. **What does getPriority() return?**  
   (a) The number of times the thread has run  
   (b) An integer representing the thread’s priority (e.g. 1–10)  
   (c) The thread’s state  
   (d) The thread’s name  

6. **Using thread priority for correct program behavior (e.g. to avoid race conditions) is:**  
   (a) Recommended  
   (b) Not recommended; use synchronization instead  
   (c) Required in Java  
   (d) Only for real-time systems  

7. **Which line sets a thread’s priority to the maximum?**  
   (a) t.setPriority(100);  
   (b) t.setPriority(Thread.MAX_PRIORITY);  
   (c) t.priority = 10;  
   (d) Thread.setPriority(t, 10);  

8. **If the main thread has NORM_PRIORITY and creates a new thread without setting priority, the new thread typically has:**  
   (a) MIN_PRIORITY  
   (b) NORM_PRIORITY  
   (c) MAX_PRIORITY  
   (d) No priority  

---

## 6. Synchronizing Threads

**Notes:**  
**Synchronization** prevents multiple threads from corrupting shared data by ensuring only one thread (or a controlled number) can execute a critical section at a time. In Java you can use: (1) **Synchronized methods**: `synchronized` on an instance method uses the object’s lock; on a static method, the lock is on the class. (2) **Synchronized blocks**: `synchronized (object) { ... }` to guard a block with a specific lock. Only one thread can hold the lock at a time; others block until the lock is released. Synchronization avoids race conditions but can cause **deadlock** if two or more threads wait for each other’s locks. Use the same lock for all access to the same shared state.

**Example:**
```java
public class SyncDemo {
    private int count = 0;

    public synchronized void increment() {
        count++;  // Critical section
    }

    public synchronized int getCount() {
        return count;
    }

    public static void main(String[] args) throws InterruptedException {
        SyncDemo obj = new SyncDemo();
        Thread t1 = new Thread(() -> { for (int i = 0; i < 10000; i++) obj.increment(); });
        Thread t2 = new Thread(() -> { for (int i = 0; i < 10000; i++) obj.increment(); });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(obj.getCount());  // 20000 (correct with sync; without sync may be less)
    }
}
```

**Practice:**  
Implement a class that has a shared counter and two methods: `add(int value)` and `subtract(int value)`. Use synchronized methods so that two threads calling add and subtract repeatedly produce a correct final counter value.

---

### MCQs – Synchronizing Threads

1. **Synchronization is used primarily to:**  
   (a) Make threads run faster  
   (b) Prevent race conditions when multiple threads access shared data  
   (c) Create more threads  
   (d) Replace the need for Runnable  

2. **When a thread enters a synchronized instance method, it:**  
   (a) Stops all other threads in the process  
   (b) Acquires the lock on the object; other threads must wait to enter any synchronized method on the same object  
   (c) Loses its priority  
   (d) Cannot call any other method  

3. **A race condition occurs when:**  
   (a) Two threads run on different CPUs  
   (b) The outcome depends on the order/timing of thread execution and shared data can become inconsistent  
   (c) Threads have different priorities  
   (d) A thread is in WAITING state  

4. **What is the output of this code (assuming no other code)?**
   ```java
   class C {
       int x = 0;
       synchronized void add() { x++; }
   }
   C c = new C();
   Thread t1 = new Thread(() -> { for (int i=0;i<1000;i++) c.add(); });
   Thread t2 = new Thread(() -> { for (int i=0;i<1000;i++) c.add(); });
   t1.start(); t2.start(); t1.join(); t2.join();
   System.out.println(c.x);
   ```
   (a) Always 2000  
   (b) Always 1000  
   (c) Could be less than 2000 without sync; with sync typically 2000  
   (d) Compilation error  

5. **synchronized(object) { ... } is used to:**  
   (a) Start a new thread  
   (b) Execute the block only when the current thread holds the lock on object  
   (c) Stop the object from being garbage collected  
   (d) Make the object immutable  

6. **Deadlock can occur when:**  
   (a) Threads have different priorities  
   (b) Two or more threads are waiting for each other’s locks in a cycle  
   (c) A thread calls wait()  
   (d) Synchronization is not used  

7. **Which statement is true?**  
   (a) Synchronized methods on the same object can run concurrently  
   (b) Only one thread at a time can execute a synchronized method on a given object  
   (c) Synchronized blocks are not related to locks  
   (d) Static synchronized methods use the lock of the instance  

8. **Without synchronization, two threads both doing count++ on a shared int count (where count++ is read-modify-write):**  
   (a) Always produce the correct total  
   (b) Can produce a final value less than the correct total due to lost updates  
   (c) Cannot compile  
   (d) Run only on single-core systems  

---

## 7. Inter-Thread Communication

**Notes:**  
**Inter-thread communication** allows threads to coordinate. The classic mechanism is **wait/notify**: `wait()`, `notify()`, and `notifyAll()` are called on an object whose lock the current thread holds (inside a synchronized block). **wait()** releases the lock and puts the thread in WAITING until another thread calls **notify()** (wakes one waiting thread) or **notifyAll()** (wakes all). The woken thread must re-acquire the lock before returning from wait(). Always use wait in a loop that checks a condition (e.g. `while (!condition) obj.wait();`) to avoid spurious wakeups. This pattern is used for producer-consumer and similar designs. Modern code can also use **java.util.concurrent** (e.g. BlockingQueue, CountDownLatch) for higher-level coordination.

**Example:**
```java
import java.util.LinkedList;
import java.util.Queue;

public class WaitNotifyDemo {
    private final Queue<Integer> queue = new LinkedList<>();
    private static final int CAP = 2;

    public synchronized void produce(int value) throws InterruptedException {
        while (queue.size() == CAP)
            wait();  // Wait until there is space
        queue.add(value);
        notify();   // Notify consumer
    }

    public synchronized int consume() throws InterruptedException {
        while (queue.isEmpty())
            wait();  // Wait until there is data
        int v = queue.poll();
        notify();   // Notify producer
        return v;
    }
}
```

**Practice:**  
Implement a simple “signal” class with a boolean flag. One thread waits (using wait()) until the flag becomes true; another thread sets the flag to true and calls notify(). Use synchronized and a while loop around wait() to guard the condition.

---

### MCQs – Inter-Thread Communication

1. **wait() must be called:**  
   (a) From any method  
   (b) Only from within a synchronized block, and the thread must hold the lock on the object on which wait() is called  
   (c) Only from static methods  
   (d) After notify()  

2. **When a thread calls wait() on an object, it:**  
   (a) Immediately continues execution  
   (b) Releases the lock on that object and goes into WAITING until notified or interrupted  
   (c) Terminates  
   (d) Only pauses for 1 millisecond  

3. **notify():**  
   (a) Wakes all threads waiting on the object  
   (b) Wakes one arbitrarily chosen thread that is waiting on the object  
   (c) Must be called before wait()  
   (d) Does not require the lock to be held  

4. **Why is it recommended to use `while (condition) { obj.wait(); }` instead of `if (condition) { obj.wait(); }`?**  
   (a) while is faster  
   (b) To handle spurious wakeups and re-check the condition after waking  
   (c) if is not allowed with wait()  
   (d) To avoid deadlock  

5. **What is the output of this code?**
   ```java
   Object lock = new Object();
   Thread t = new Thread(() -> {
       synchronized (lock) {
           try { lock.wait(100); } catch (InterruptedException e) {}
           System.out.print("B");
       }
   });
   t.start();
   Thread.sleep(50);
   synchronized (lock) { System.out.print("A"); lock.notify(); }
   t.join();
   ```
   (a) AB  
   (b) BA  
   (c) A only  
   (d) Compilation error  

6. **notifyAll() is used when:**  
   (a) You want to wake only the main thread  
   (b) You want to wake all threads waiting on the object so they can re-check their conditions  
   (c) You want to terminate all threads  
   (d) wait() was never called  

7. **After notify() is called, the woken thread:**  
   (a) Immediately runs without needing the lock  
   (b) Must re-acquire the lock before returning from wait()  
   (c) Cannot run until the notifying thread terminates  
   (d) Always runs before the notifying thread  

8. **Inter-thread communication with wait/notify is typically used for:**  
   (a) Replacing synchronization  
   (b) Producer-consumer and other coordination where one thread must wait for a condition set by another  
   (c) Increasing thread priority  
   (d) Creating new threads  

---

## 8. Assignment Questions (Covering Entire Syllabus)

Use these questions to test your understanding of the full syllabus. Answer in your own words and with code where asked.

---

### Assignment Question 1 (Processes vs Threads)

**Question:**  
(a) Explain the main differences between a process and a thread. What do threads share within the same process?  
(b) When would you prefer using multiple threads in one process over using multiple separate processes? Give one example.

---

### Assignment Question 2 (Thread States and Lifecycle)

**Question:**  
(a) List the six thread states in Java and briefly describe when a thread is in each.  
(b) What is the difference between BLOCKED and WAITING? When does a thread move from NEW to TERMINATED?

---

### Assignment Question 3 (Creating and Interrupting Threads)

**Question:**  
(a) Compare creating a thread by extending `Thread` vs implementing `Runnable`. Why is `Runnable` often preferred?  
(b) What is the purpose of thread interruption? How should a thread respond to `InterruptedException`? Write a short example where a thread exits its loop when interrupted.

---

### Assignment Question 4 (Priorities and Synchronization)

**Question:**  
(a) What are thread priorities in Java? Why should you not rely on them for correctness?  
(b) What is a race condition? How does synchronization (synchronized method or block) help prevent it? Write a small example where two threads increment a shared counter with and without synchronization.

---

### Assignment Question 5 (Synchronization and Deadlock)

**Question:**  
(a) Explain how synchronized methods and synchronized blocks work. What lock does a static synchronized method use?  
(b) What is deadlock? Give a simple scenario (e.g. two threads and two locks) that can lead to deadlock.

---

### Assignment Question 6 (Inter-Thread Communication)

**Question:**  
(a) Describe the roles of `wait()`, `notify()`, and `notifyAll()` in inter-thread communication. On which object are they called and from where?  
(b) Why should the condition for waiting be checked in a loop (e.g. `while (!ready) wait();`) rather than with a simple `if`?  
(c) Write a minimal producer-consumer style example where one thread adds an item to a shared list and another thread removes it, using wait/notify.

---

## 9. Coding Practice Questions (Hands-On)

These coding questions help you apply multithreading concepts end-to-end.

---

### Coding Question 1: Counter with Synchronization

**Problem:**  
Create a class `SharedCounter` with a single `int` field. Provide methods `increment()` and `decrement()` that are thread-safe using synchronization. Create two threads: one calls `increment()` 1000 times and the other calls `decrement()` 1000 times. After both finish, the counter should be 0. Run it multiple times to verify. Then remove synchronization and observe incorrect results.

**Concepts tested:** Creating threads (Runnable), synchronized methods, race conditions, join().

---

### Coding Question 2: Interruptible Worker and Producer-Consumer

**Problem:**  
(a) **Interruptible worker:** Create a thread that repeatedly prints "Working" and sleeps for 500 ms. From the main thread, interrupt it after 3 seconds. The worker should catch `InterruptedException`, print "Stopped by interrupt", and exit cleanly. Use `join()` in main to wait for the worker to finish.

(b) **Simple producer-consumer:** Implement a bounded buffer (size 5) with `put(int value)` and `take()` methods using synchronized, wait(), and notifyAll(). One producer thread should put numbers 1–10; one consumer thread should take and print them. Use a while loop to check the condition (buffer full/empty) around wait().

**Concepts tested:** Interruption, InterruptedException, wait/notify, synchronized, conditions.

---

### Coding Question 3: Thread States and Priorities

**Problem:**  
(a) Write a program that creates a thread and prints its state at these points: (1) after creation, (2) after start(), (3) after the thread has finished (use join()). Name the states you observe.

(b) Create three threads that each print their name and priority 5 times. Set their priorities to MIN_PRIORITY, NORM_PRIORITY, and MAX_PRIORITY. Run the program several times. Do you always get the same order? Write a one-line comment in code explaining why.

**Concepts tested:** Thread states (getState()), priorities (setPriority, getPriority), join(), observation of non-deterministic scheduling.

---

## Answer Key (Summary)

| Section | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|--------|----|----|----|----|----|----|----|-----|
| 1. Processes vs Threads | b | b | b | b | b | b | b | b |
| 2. Thread States | b | b | c | c | b | c | b | b |
| 3. Creating Threads | b | b | b | c | a | b | b | b |
| 4. Interrupting | b | b | b | b | b | b | b | b |
| 5. Priorities | b | a | b | c | b | b | b | b |
| 6. Synchronization | b | b | b | a | b | b | b | b |
| 7. Inter-Thread Comm. | b | b | b | b | a | b | b | b |

---

*Use this document as PPT notes: each topic has a short note, example, practice idea, and 7–8 MCQs. All code examples are in Java.*
