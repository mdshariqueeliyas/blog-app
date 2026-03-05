# Java Files, Collections Framework & JDBC – PPT Notes for Students

Study notes for each topic: short definition, example, practice question, and MCQs.

---

## Part 1: Files and Streams

---

## 1. Streams – Byte Streams and Character Streams

**Notes:**  
A **stream** is a sequence of data. In Java I/O, streams are used to read from or write to a source (file, network, memory). There are two main types:

- **Byte streams** (`InputStream` / `OutputStream`): read/write raw bytes (8-bit). Used for binary data (images, audio, any file). Classes: `FileInputStream`, `FileOutputStream`, etc.
- **Character streams** (`Reader` / `Writer`): read/write 16-bit Unicode characters. Used for text. Classes: `FileReader`, `FileWriter`, `BufferedReader`, `BufferedWriter`. They handle character encoding.

**Rule of thumb:** Use **character streams** for text; use **byte streams** for binary data.

**Example:**
```java
import java.io.*;

// Byte stream – read bytes from file
try (FileInputStream fis = new FileInputStream("data.bin")) {
    int b;
    while ((b = fis.read()) != -1) {
        System.out.print((byte) b + " ");
    }
}

// Character stream – read text
try (FileReader fr = new FileReader("notes.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

**Practice:**  
Write a program that uses `FileInputStream` to read a file byte by byte and count how many bytes the file has. Then use `FileReader` to read the same file as text and print the first line.

---

### MCQs – Streams (Byte and Character)

1. **In Java I/O, a stream represents:**  
   (a) A GUI component  
   (b) A sequence of data that can be read from or written to  
   (c) A type of exception  
   (d) A thread  

2. **Byte streams in Java are used for:**  
   (a) Only text files  
   (b) Binary data (e.g., images, raw bytes)  
   (c) Network connections only  
   (d) Keyboard input only  

3. **Which pair is used for character-based I/O?**  
   (a) InputStream, OutputStream  
   (b) Reader, Writer  
   (c) FileInputStream, FileOutputStream  
   (d) DataInputStream, DataOutputStream  

4. **FileReader extends:**  
   (a) InputStream  
   (b) Reader  
   (c) FileInputStream  
   (d) Writer  

5. **What does `fis.read()` return when the end of the stream is reached?**  
   (a) 0  
   (b) -1  
   (c) null  
   (d) EOF  

6. **For reading text files with proper character encoding, you should prefer:**  
   (a) FileInputStream  
   (b) FileReader (or InputStreamReader with charset)  
   (c) DataInputStream  
   (d) ObjectInputStream  

7. **What is the output of the following code?**
```java
try (FileOutputStream fos = new FileOutputStream("x.txt")) {
    fos.write(65);
}
// Assume x.txt is read as text; what is in the file?
```
   (a) "65"  
   (b) Character 'A' (ASCII 65)  
   (c) Binary value 65  
   (d) Compilation error  

8. **BufferedReader is used with:**  
   (a) Byte streams only  
   (b) Character streams (e.g., Reader) for efficient line-based reading  
   (c) Only network streams  
   (d) Only FileOutputStream  

---

## 2. Text Input/Output

**Notes:**  
**Text I/O** works with characters (strings, lines). Use `Reader`/`Writer` and their subclasses. Common classes:

- **FileReader** / **FileWriter**: read/write character files (use default charset).
- **BufferedReader** / **BufferedWriter**: buffer for efficiency; `readLine()` reads a full line.
- **PrintWriter**: convenient `print()`/`println()` for writing text.

Always specify or be aware of character encoding (e.g., UTF-8) when reading/writing text to avoid wrong characters in different locales.

**Example:**
```java
import java.io.*;

// Writing text
try (PrintWriter pw = new PrintWriter(new FileWriter("output.txt"))) {
    pw.println("Hello");
    pw.println(42);
}

// Reading text line by line
try (BufferedReader br = new BufferedReader(new FileReader("output.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

**Practice:**  
Write a program that reads lines from the console until the user types "quit", and writes each line to a file called `user_input.txt`.

---

### MCQs – Text Input/Output

1. **For writing strings and numbers as text to a file, which is often used?**  
   (a) FileOutputStream only  
   (b) PrintWriter with Writer  
   (c) DataOutputStream only  
   (d) ObjectOutputStream  

2. **BufferedReader.readLine() returns:**  
   (a) A character  
   (b) A line of text as String, or null at end of stream  
   (c) A byte array  
   (d) An int  

3. **Which class provides print() and println() for easy text output?**  
   (a) FileWriter  
   (b) BufferedWriter  
   (c) PrintWriter  
   (d) OutputStreamWriter  

4. **When reading text files, character encoding matters because:**  
   (a) It does not matter in Java  
   (b) Wrong encoding can produce wrong characters (e.g., non-ASCII)  
   (c) Encoding only affects network I/O  
   (d) Java always uses ASCII  

5. **FileWriter is used to:**  
   (a) Read bytes  
   (b) Write characters (text) to a file  
   (c) Read lines only  
   (d) Append only  

6. **What is the output of the following code?**
```java
try (PrintWriter pw = new PrintWriter("t.txt")) {
    pw.print("A");
    pw.print("B");
    pw.println("C");
}
// Then read first line of t.txt
```
   (a) "A"  
   (b) "ABC"  
   (c) "A B C"  
   (d) "A\nB\nC"  

7. **To read a text file with UTF-8 encoding explicitly, you would use:**  
   (a) new FileReader("f.txt")  
   (b) new InputStreamReader(new FileInputStream("f.txt"), StandardCharsets.UTF_8)  
   (c) new FileInputStream("f.txt")  
   (d) new BufferedReader("f.txt")  

8. **Closing a Reader/Writer is important to:**  
   (a) Improve performance only  
   (b) Flush buffers and release system resources  
   (c) Avoid compilation errors only  
   (d) Enable reading again  

---

## 3. Binary Input/Output

**Notes:**  
**Binary I/O** reads and writes raw bytes or primitive data types (int, double, etc.) without converting to text. Use **byte streams** and optionally **DataInputStream** / **DataOutputStream** (or **ObjectInputStream** / **ObjectOutputStream** for objects).

- **DataOutputStream**: `writeInt()`, `writeDouble()`, `writeUTF(string)`, etc.
- **DataInputStream**: `readInt()`, `readDouble()`, `readUTF()`, etc.  
Order and types must match what was written.

**Example:**
```java
import java.io.*;

// Write binary data
try (DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.bin"))) {
    dos.writeInt(100);
    dos.writeDouble(3.14);
    dos.writeUTF("Hello");
}

// Read binary data (same order)
try (DataInputStream dis = new DataInputStream(new FileInputStream("data.bin"))) {
    int n = dis.readInt();
    double d = dis.readDouble();
    String s = dis.readUTF();
    System.out.println(n + " " + d + " " + s);  // 100 3.14 Hello
}
```

**Practice:**  
Write a program that writes an array of 5 integers to a binary file using `DataOutputStream`, then reads them back and prints the sum.

---

### MCQs – Binary Input/Output

1. **Binary I/O in Java typically uses:**  
   (a) Reader/Writer  
   (b) InputStream/OutputStream (and DataInputStream/DataOutputStream)  
   (c) PrintWriter only  
   (d) BufferedReader only  

2. **DataOutputStream can write:**  
   (a) Only bytes  
   (b) Primitives (int, double, etc.) and UTF strings in binary form  
   (c) Only strings  
   (d) Only objects  

3. **When reading with DataInputStream, you must:**  
   (a) Read in the same order and types as written  
   (b) Only read bytes  
   (c) Skip the first byte  
   (d) Use readLine()  

4. **writeUTF(String) writes:**  
   (a) Plain ASCII only  
   (b) String in modified UTF-8 format (binary)  
   (c) Only one character  
   (d) String as lines  

5. **A file created with DataOutputStream is best read with:**  
   (a) FileReader  
   (b) DataInputStream (matching write order)  
   (c) BufferedReader  
   (d) ObjectInputStream only  

6. **What is the output of the following code?**
```java
try (DataOutputStream dos = new DataOutputStream(new FileOutputStream("n.bin"))) {
    dos.writeInt(10);
    dos.writeInt(20);
}
try (DataInputStream dis = new DataInputStream(new FileInputStream("n.bin"))) {
    int a = dis.readInt();
    int b = dis.readInt();
    System.out.println(a + b);
}
```
   (a) 1020  
   (b) 30  
   (c) Compilation error  
   (d) Runtime exception  

7. **ObjectOutputStream is used to:**  
   (a) Write only primitives  
   (b) Serialize and write objects (and primitives) to a stream  
   (c) Read text only  
   (d) Write to console only  

8. **If you write with writeInt(100) and then read with readDouble():**  
   (a) You get 100.0  
   (b) Data is misinterpreted (wrong type); results are meaningless  
   (c) IOException is thrown  
   (d) readDouble() is not valid for DataInputStream  

---

## 4. Random Access File Operations

**Notes:**  
A **random access file** allows reading and writing at any position (byte offset) in the file, not only sequentially. In Java this is done with **RandomAccessFile**.

- Open with mode: `"r"` (read), `"rw"` (read-write), `"rws"` (sync), etc.
- **getFilePointer()**: current position in the file.
- **seek(long pos)**: set position to `pos` (in bytes).
- **read()** / **write()**: read/write bytes at current position; position advances.
- **readInt()** / **writeInt()**, etc.: read/write at current position (position advances by type size).

Useful for large files when you need to jump to a specific record or update in place.

**Example:**
```java
import java.io.*;

try (RandomAccessFile raf = new RandomAccessFile("data.dat", "rw")) {
    raf.writeInt(100);   // bytes 0-3
    raf.writeInt(200);   // bytes 4-7
    raf.seek(0);         // back to start
    int first = raf.readInt();
    raf.seek(4);         // skip to second int
    int second = raf.readInt();
    System.out.println(first + " " + second);  // 100 200
}
```

**Practice:**  
Create a binary file with 10 integers (0 to 9). Using RandomAccessFile, seek to the 5th integer (byte offset 5*4 = 20), read it, then write 999 at that position. Read the file again and verify.

---

### MCQs – Random Access File

1. **RandomAccessFile allows:**  
   (a) Only sequential reading  
   (b) Reading and writing at any byte position in the file  
   (c) Only writing at the end  
   (d) Only reading from the start  

2. **The method that sets the current position in a RandomAccessFile is:**  
   (a) setPosition()  
   (b) seek(long pos)  
   (c) skip(long n)  
   (d) reset()  

3. **getFilePointer() returns:**  
   (a) The file size  
   (b) The current byte position in the file  
   (c) The number of records  
   (d) A pointer to the file object  

4. **Mode "rw" in RandomAccessFile means:**  
   (a) Read only  
   (b) Read and write  
   (c) Write only  
   (d) Append only  

5. **After writeInt(42), the file pointer advances by:**  
   (a) 1 byte  
   (b) 4 bytes  
   (c) 8 bytes  
   (d) 2 bytes  

6. **What is the output of the following code?**
```java
try (RandomAccessFile raf = new RandomAccessFile("r.dat", "rw")) {
    raf.writeDouble(1.0);
    raf.writeDouble(2.0);
    raf.seek(0);
    System.out.print(raf.readDouble() + " ");
    System.out.println(raf.readDouble());
}
```
   (a) 0.0 0.0  
   (b) 1.0 2.0  
   (c) 2.0 1.0  
   (d) Exception  

7. **RandomAccessFile can be used for:**  
   (a) Text files only  
   (b) Binary files; position is in bytes  
   (c) Only network streams  
   (d) Only reading  

8. **To read the last int in a file of 100 ints (each 4 bytes), you would:**  
   (a) Read 100 ints sequentially  
   (b) seek(99 * 4) then readInt()  
   (c) seek(100) then readInt()  
   (d) Use readLong()  

---

## 5. File Management Using the File Class

**Notes:**  
The **File** class (`java.io.File`) represents a path to a file or directory. It is used for:

- **Metadata**: exists(), isFile(), isDirectory(), length(), getName(), getPath(), lastModified().
- **Operations**: createNewFile(), mkdir(), mkdirs(), delete(), renameTo(File).
- **Listing**: list(), listFiles() to list directory contents.

**Note:** `File` does not read/write file content; it only represents the path and allows queries and file-system operations. For actual I/O use streams or NIO (e.g., `Files`, `Paths`).

**Example:**
```java
import java.io.*;

File f = new File("myfolder/data.txt");
System.out.println("Exists: " + f.exists());
System.out.println("Is file: " + f.isFile());
System.out.println("Size: " + f.length());

File dir = new File("myfolder");
if (dir.isDirectory()) {
    for (File child : dir.listFiles()) {
        System.out.println(child.getName());
    }
}

// Create directory if not exists
new File("newdir").mkdirs();
```

**Practice:**  
Write a program that accepts a path from the user, creates a `File` object, and prints whether it exists, is file or directory, and if it is a directory, lists all names inside it.

---

### MCQs – File Class

1. **The File class is used to:**  
   (a) Read file content  
   (b) Represent path and perform file/directory operations and metadata  
   (c) Write bytes only  
   (d) Open network connections  

2. **f.exists() returns:**  
   (a) The file size  
   (b) true if the file or directory exists  
   (c) The parent path  
   (d) The file content  

3. **To create a directory (and parent directories), we can use:**  
   (a) createNewFile()  
   (b) mkdirs()  
   (c) createDir()  
   (d) newDirectory()  

4. **listFiles() returns:**  
   (a) String array of file names  
   (b) File array of files and directories in the directory  
   (c) A single File  
   (d) File content as bytes  

5. **f.length() returns:**  
   (a) Number of lines  
   (b) Size in bytes (for files)  
   (c) Number of files in directory  
   (d) Path length  

6. **What is the output of the following code?**
```java
File f = new File("/nonexistent/x.txt");
System.out.println(f.exists() + " " + f.isFile());
```
   (a) true true  
   (b) false false  
   (c) true false  
   (d) false true  

7. **renameTo(File dest) is used to:**  
   (a) Copy a file  
   (b) Rename or move the file/directory  
   (c) Delete the file  
   (d) Create a new file  

8. **To get only the file name (e.g., "data.txt") from a File object, we use:**  
   (a) getPath()  
   (b) getName()  
   (c) getAbsolutePath()  
   (d) getParent()  

---

## Part 2: The Collections Framework (java.util)

---

## 6. Collections Overview

**Notes:**  
The **Collections Framework** is a unified architecture for representing and manipulating **groups of objects**. It provides:

- **Interfaces**: common contracts (List, Set, Queue, Map, etc.).
- **Implementations**: concrete classes (ArrayList, HashSet, HashMap, etc.).
- **Algorithms**: static methods in `Collections` (sort, binarySearch, reverse, etc.).

Benefits: reuse, interoperability, less code, well-tested data structures. All framework classes are in `java.util` (and related packages).

**Example:**
```java
import java.util.*;

List<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
Collections.sort(list);
System.out.println(list);  // [apple, banana]
```

**Practice:**  
Name three collection interfaces and one implementation class for each.

---

### MCQs – Collections Overview

1. **The Java Collections Framework provides:**  
   (a) Only arrays  
   (b) Interfaces, implementations, and algorithms for groups of objects  
   (c) Only maps  
   (d) Only lists  

2. **Collections class provides:**  
   (a) Only concrete list implementations  
   (b) Static utility methods (e.g., sort, reverse) that operate on collections  
   (c) New collection types only  
   (d) Only iteration  

3. **Which package contains the core collection interfaces?**  
   (a) java.io  
   (b) java.util  
   (c) java.lang  
   (d) java.collection  

4. **Using collection interfaces (e.g., List) instead of concrete classes (e.g., ArrayList) in variable types:**  
   (a) Is not allowed  
   (b) Allows switching implementations easily and follows “program to interface”  
   (c) Slows down the program  
   (d) Only works for sets  

5. **Which is part of the Collections Framework?**  
   (a) File  
   (b) ArrayList  
   (c) String  
   (d) Thread  

6. **What is the output of the following code?**
```java
List<Integer> list = Arrays.asList(3, 1, 2);
Collections.sort(list);
System.out.println(list.get(0));
```
   (a) 3  
   (b) 1  
   (c) 2  
   (d) NullPointerException  

7. **Collection (singular) in java.util refers to:**  
   (a) The Collections utility class  
   (b) The root interface for most collection types (excluding Map)  
   (c) Only Set  
   (d) Only List  

8. **Generics in collections (e.g., List<String>) are used to:**  
   (a) Improve performance only  
   (b) Provide type safety and avoid casting  
   (c) Allow only primitive types  
   (d) Create arrays only  

---

## 7. Hierarchy of the Collection Framework

**Notes:**  
Main interfaces:

- **Iterable**: can be iterated (for-each); implemented by Collection.
- **Collection**: root for single-value groups (no key-value). Sub-interfaces: **List** (ordered, duplicate allowed), **Set** (no duplicates), **Queue** (FIFO or priority).
- **Map**: key-value pairs; not a sub-interface of Collection.

Common implementations:

- List → ArrayList, LinkedList  
- Set → HashSet, TreeSet (sorted)  
- Queue → LinkedList, PriorityQueue, ArrayDeque  
- Map → HashMap, TreeMap  

**Example:**
```java
Collection<String> c = new ArrayList<>();  // List extends Collection
c.add("a");
Set<Integer> set = new HashSet<>();         // Set extends Collection
Map<String, Integer> map = new HashMap<>(); // Map is separate
```

**Practice:**  
Draw a simple hierarchy: Iterable → Collection; Collection → List, Set, Queue. Write one implementation class under List and one under Set.

---

### MCQs – Hierarchy

1. **Which interface is at the top of the collection hierarchy (for single-value groups)?**  
   (a) List  
   (b) Collection  
   (c) Set  
   (d) Map  

2. **Map is a sub-interface of Collection.**  
   (a) True  
   (b) False  

3. **List allows:**  
   (a) No duplicates only  
   (b) Ordered elements, duplicates allowed  
   (c) Only unique keys  
   (d) No order  

4. **Set guarantees:**  
   (a) Order of insertion  
   (b) No duplicate elements  
   (c) Key-value pairs  
   (d) Sorted order always  

5. **Which extends Collection?**  
   (a) Map  
   (b) List  
   (c) HashMap  
   (d) Arrays  

6. **What is the output of the following code?**
```java
Set<String> set = new HashSet<>();
set.add("x");
set.add("x");
set.add("y");
System.out.println(set.size());
```
   (a) 3  
   (b) 2  
   (c) 1  
   (d) 0  

7. **Queue is used for:**  
   (a) Key-value storage  
   (b) Ordered processing (e.g., FIFO or priority)  
   (c) Only sets  
   (d) Only sorting  

8. **Iterable is implemented by:**  
   (a) Only List  
   (b) Collection and thus List, Set, Queue implementations  
   (c) Only Map  
   (d) Only arrays  

---

## 8. Collection Interfaces

**Notes:**  
- **List**: ordered sequence; duplicate allowed; access by index (get(i), set(i, e)); implementations: ArrayList, LinkedList.  
- **Set**: no duplicates; implementations: HashSet (unordered), TreeSet (sorted).  
- **Queue**: typically FIFO or priority; offer(), poll(), peek(); implementations: LinkedList, PriorityQueue, ArrayDeque.  
- **Map**: key-value; no duplicate keys; get(key), put(key, value); implementations: HashMap, TreeMap.

**Example:**
```java
List<String> list = new ArrayList<>();
list.add("a");
list.add(0, "b");   // list is [b, a]

Set<Integer> set = new HashSet<>();
set.add(1);
set.add(1);         // still one element

Queue<String> q = new LinkedList<>();
q.offer("first");
q.offer("second");
System.out.println(q.poll());  // first
```

**Practice:**  
Create a List of 5 integers, a Set of 5 integers (with one duplicate), and a Queue. Add elements and remove one from the queue. Print sizes.

---

### MCQs – Collection Interfaces

1. **Which interface supports index-based access get(int index)?**  
   (a) Set  
   (b) List  
   (c) Map  
   (d) Queue  

2. **Duplicate elements are allowed in:**  
   (a) Set only  
   (b) List  
   (c) Map keys  
   (d) None  

3. **Queue typically provides:**  
   (a) get(key)  
   (b) offer(), poll(), peek()  
   (c) put(key, value)  
   (d) add(index, e)  

4. **Map stores:**  
   (a) Single values only  
   (b) Key-value pairs; keys unique  
   (c) Only sorted values  
   (d) Only integers  

5. **Which method is from the List interface?**  
   (a) put(key, value)  
   (b) get(int index)  
   (c) poll()  
   (d) get(key)  

6. **What is the output of the following code?**
```java
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(1, 3);
System.out.println(list);
```
   (a) [1, 2, 3]  
   (b) [1, 3, 2]  
   (c) [3, 1, 2]  
   (d) [1, 2]  

7. **Set.add(e) for an element already in the set:**  
   (a) Throws exception  
   (b) Returns false and does not add duplicate  
   (c) Replaces the old element  
   (d) Adds at the end  

8. **Which is not a Collection sub-interface?**  
   (a) List  
   (b) Set  
   (c) Map  
   (d) Queue  

---

## 9. ArrayList and LinkedList

**Notes:**  
- **ArrayList**: resizable array; fast get/set by index O(1); insertion/removal in the middle is O(n). Good for random access and iteration.  
- **LinkedList**: doubly linked list; fast add/remove at beginning/end O(1); get by index is O(n). Implements both List and Deque (and Queue). Good when you do many insertions/removals at ends or in the middle with an iterator.

**Example:**
```java
List<String> al = new ArrayList<>();
al.add("A");
al.add("B");
al.get(0);        // "A"
al.set(1, "C");  // [A, C]

List<String> ll = new LinkedList<>();
ll.add("X");
ll.addFirst("Y");  // [Y, X]
ll.removeLast();   // [Y]
```

**Practice:**  
Use an ArrayList to store 10 numbers, then remove all even numbers. Use a LinkedList to add 5 strings at the front and print the first and last elements.

---

### MCQs – ArrayList and LinkedList

1. **ArrayList is backed by:**  
   (a) A linked list  
   (b) A resizable array  
   (c) A tree  
   (d) A hash table  

2. **For get(int index), which is faster on average?**  
   (a) LinkedList  
   (b) ArrayList  
   (c) Both same  
   (d) HashSet  

3. **LinkedList implements:**  
   (a) Only List  
   (b) List and Deque (and Queue)  
   (c) Only Set  
   (d) Only Map  

4. **Adding at the beginning of a list is generally faster with:**  
   (a) ArrayList  
   (b) LinkedList  
   (c) Both same  
   (d) HashSet  

5. **new ArrayList<>() creates:**  
   (a) A fixed-size list of 10  
   (b) An empty list that can grow  
   (c) A list with one null element  
   (d) An immutable list  

6. **What is the output of the following code?**
```java
List<Integer> list = new ArrayList<>();
list.add(5);
list.add(10);
list.add(15);
list.remove(1);
System.out.println(list);
```
   (a) [5, 15]  
   (b) [5, 10, 15]  
   (c) [10, 15]  
   (d) [5, 10]  

7. **addFirst(e) is available in:**  
   (a) ArrayList  
   (b) LinkedList (as Deque)  
   (c) HashSet  
   (d) PriorityQueue  

8. **When you need frequent random access by index, prefer:**  
   (a) LinkedList  
   (b) ArrayList  
   (c) HashSet  
   (d) TreeSet  

---

## 10. HashSet and TreeSet

**Notes:**  
- **HashSet**: unordered (no guaranteed order); no duplicates; add/contains/remove O(1) average. Uses hashCode() and equals().  
- **TreeSet**: sorted order (natural or Comparator); no duplicates; add/contains/remove O(log n). Elements must be comparable or you provide a Comparator.

**Example:**
```java
Set<String> hs = new HashSet<>();
hs.add("banana");
hs.add("apple");
hs.add("banana");
System.out.println(hs);  // [apple, banana] (order not guaranteed)

Set<String> ts = new TreeSet<>();
ts.add("banana");
ts.add("apple");
System.out.println(ts);  // [apple, banana] (sorted)
```

**Practice:**  
Create a HashSet of integers with some duplicates and print its size. Create a TreeSet of strings and print the first and last element (using iterator or stream).

---

### MCQs – HashSet and TreeSet

1. **HashSet does not allow:**  
   (a) Null  
   (b) Duplicate elements  
   (c) More than 10 elements  
   (d) Strings  

2. **TreeSet keeps elements:**  
   (a) In insertion order  
   (b) In sorted (natural or comparator) order  
   (c) In random order  
   (d) Only unique keys  

3. **HashSet uses which of the following for uniqueness?**  
   (a) compareTo()  
   (b) hashCode() and equals()  
   (c) Only equals()  
   (d) Only hashCode()  

4. **TreeSet requires elements to be:**  
   (a) Only integers  
   (b) Comparable or a Comparator provided  
   (c) Only strings  
   (d) From an array  

5. **Which has predictable iteration order (sorted)?**  
   (a) HashSet  
   (b) TreeSet  
   (c) Neither  
   (d) Both  

6. **What is the output of the following code?**
```java
Set<Integer> set = new TreeSet<>();
set.add(30);
set.add(10);
set.add(20);
System.out.println(set);
```
   (a) [30, 10, 20]  
   (b) [10, 20, 30]  
   (c) [20, 10, 30]  
   (d) Order undefined  

7. **contains(o) in HashSet is on average:**  
   (a) O(n)  
   (b) O(1)  
   (c) O(log n)  
   (d) O(n^2)  

8. **To store unique elements in sorted order we use:**  
   (a) HashSet  
   (b) TreeSet  
   (c) ArrayList  
   (d) HashMap  

---

## 11. PriorityQueue and ArrayDeque

**Notes:**  
- **PriorityQueue**: heap-based; elements processed by **priority** (natural order or Comparator), not FIFO. offer(), poll(), peek(). No null. O(log n) for offer/poll.  
- **ArrayDeque**: resizable array; double-ended queue. addFirst/addLast, removeFirst/removeLast, offer/poll. No null. O(1) amortized for end operations. Can be used as stack (push/pop) or queue (offer/poll).

**Example:**
```java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
System.out.println(pq.poll());  // 10 (smallest first by default)

Deque<String> dq = new ArrayDeque<>();
dq.addLast("a");
dq.addLast("b");
dq.addFirst("z");
System.out.println(dq.pollFirst());  // z
```

**Practice:**  
Use a PriorityQueue to add 5 integers and remove them one by one with poll(), printing each. Use an ArrayDeque as a stack: push 3 elements, then pop and print each.

---

### MCQs – PriorityQueue and ArrayDeque

1. **PriorityQueue orders elements by:**  
   (a) Insertion order  
   (b) Natural order or Comparator (priority)  
   (c) Random order  
   (d) Only FIFO  

2. **ArrayDeque allows:**  
   (a) Only stack operations  
   (b) Double-ended operations (add/remove from both ends)  
   (c) Only priority order  
   (d) Only one element  

3. **poll() in PriorityQueue removes:**  
   (a) The last element  
   (b) The head (highest priority by ordering)  
   (c) A random element  
   (d) The middle element  

4. **Which can be used as a LIFO stack?**  
   (a) Only Stack class  
   (b) ArrayDeque (push/pop)  
   (c) PriorityQueue  
   (d) HashSet  

5. **PriorityQueue does not allow:**  
   (a) Duplicates  
   (b) null elements  
   (c) Integers  
   (d) Strings  

6. **What is the output of the following code?**
```java
Queue<String> q = new PriorityQueue<>();
q.offer("c");
q.offer("a");
q.offer("b");
System.out.print(q.poll() + " " + q.poll());
```
   (a) "c a"  
   (b) "a b"  
   (c) "a a"  
   (d) "c b"  

7. **ArrayDeque is implemented using:**  
   (a) Linked list  
   (b) Resizable array (circular)  
   (c) Tree  
   (d) Hash table  

8. **For FIFO queue with O(1) enqueue/dequeue, a good choice is:**  
   (a) ArrayList  
   (b) PriorityQueue  
   (c) ArrayDeque  
   (d) TreeSet  

---

## Part 3: Connecting to Database (JDBC)

---

## 12. Connecting to a Database

**Notes:**  
**JDBC** (Java Database Connectivity) is the API for connecting to relational databases from Java. Steps:

1. Load the driver (Class.forName("driver class") or let DriverManager auto-load).  
2. Get a connection: `DriverManager.getConnection(url, user, password)`.  
3. Use the connection to create Statement/PreparedStatement and execute SQL.  
4. Close resources (Connection, Statement, ResultSet) when done (try-with-resources).

**Connection URL** format depends on the DB (e.g., MySQL: `jdbc:mysql://host:port/dbname`, Oracle: `jdbc:oracle:thin:@host:port:sid`).

**Example:**
```java
import java.sql.*;

String url = "jdbc:mysql://localhost:3306/mydb";
String user = "root";
String pass = "password";
try (Connection conn = DriverManager.getConnection(url, user, pass)) {
    System.out.println("Connected: " + conn.getCatalog());
}
```

**Practice:**  
Write a small program that loads the MySQL driver (if available) and attempts to get a connection. Print success or the exception message.

---

### MCQs – Connecting to Database

1. **JDBC stands for:**  
   (a) Java Data Base Class  
   (b) Java Database Connectivity  
   (c) Java Dynamic Base Connection  
   (d) Java Data Binding API  

2. **To get a connection we use:**  
   (a) Connection.get(url)  
   (b) DriverManager.getConnection(url, user, password)  
   (c) Statement.getConnection()  
   (d) ResultSet.connect()  

3. **Which is responsible for managing JDBC drivers?**  
   (a) Connection  
   (b) DriverManager  
   (c) ResultSet  
   (d) Statement  

4. **A typical MySQL JDBC URL looks like:**  
   (a) mysql://localhost/mydb  
   (b) jdbc:mysql://host:port/dbname  
   (c) jdbc:localhost:3306  
   (d) connection:mysql  

5. **Closing the Connection is important to:**  
   (a) Commit the transaction  
   (b) Release database resources  
   (c) Create a new connection  
   (d) Run a query  

6. **What is the output of the following code if connection fails?**
```java
try (Connection c = DriverManager.getConnection("jdbc:mysql://invalid/host", "u", "p")) {
    System.out.println("OK");
} catch (SQLException e) {
    System.out.println("Error: " + e.getMessage().substring(0, 5));
}
```
   (a) OK  
   (b) Error: (first 5 chars of message)  
   (c) No output  
   (d) Compilation error  

7. **Class.forName("com.mysql.cj.jdbc.Driver") is used to:**  
   (a) Execute a query  
   (b) Load and register the JDBC driver (optional in modern JDBC)  
   (c) Close the connection  
   (d) Create a ResultSet  

8. **try-with-resources is used with Connection to:**  
   (a) Improve query speed  
   (b) Automatically close the connection when done  
   (c) Open multiple connections  
   (d) Commit only  

---

## 13. Querying a Database and Processing Results

**Notes:**  
To **query** and process results:

1. From a **Connection**, create a **Statement** or **PreparedStatement**.  
2. Execute query: **executeQuery(sql)** returns a **ResultSet**.  
3. **ResultSet**: cursor over rows; use **next()** to move and **getXXX(column)** to read values (getInt(1), getString("name"), etc.).  
4. Loop while **resultSet.next()** and read columns by index or name.  
5. Close ResultSet and Statement (try-with-resources).

**Example:**
```java
String sql = "SELECT id, name FROM users WHERE id > ?";
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setInt(1, 0);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("name");
            System.out.println(id + " " + name);
        }
    }
}
```

**Practice:**  
Write a program that runs SELECT * FROM a table (e.g., a simple test table), iterates over the ResultSet, and prints each row (assume two columns: id int, name varchar).

---

### MCQs – Querying and Processing Results

1. **executeQuery() returns:**  
   (a) int (number of rows)  
   (b) ResultSet  
   (c) Connection  
   (d) boolean  

2. **To move to the next row in a ResultSet we use:**  
   (a) getNext()  
   (b) next()  
   (c) move()  
   (d) fetch()  

3. **getInt("id") on ResultSet:**  
   (a) Gets the row number  
   (b) Gets the value of column "id" in the current row as int  
   (c) Gets the number of columns  
   (d) Gets the first column only  

4. **PreparedStatement is preferred over Statement for SELECT with parameters because:**  
   (a) It is faster only  
   (b) It avoids SQL injection and can be more efficient  
   (c) It cannot take parameters  
   (d) It is required for all queries  

5. **ResultSet is initially positioned:**  
   (a) On the first row  
   (b) Before the first row (must call next() to get first row)  
   (c) On the last row  
   (d) After the last row  

6. **What is the output of the following code if the query returns one row with id=1, name="Alice"?**
```java
ResultSet rs = stmt.executeQuery("SELECT id, name FROM t");
rs.next();
System.out.println(rs.getInt(1) + " " + rs.getString(2));
```
   (a) 0 null  
   (b) 1 Alice  
   (c) 2 Alice  
   (d) Exception  

7. **executeUpdate() is used for:**  
   (a) SELECT only  
   (b) INSERT, UPDATE, DELETE (and DDL)  
   (c) Only CREATE TABLE  
   (d) Closing the connection  

8. **Closing the ResultSet:**  
   (a) Is optional  
   (b) Frees resources; good practice (e.g., try-with-resources)  
   (c) Commits the transaction  
   (d) Re-runs the query  

---

## 14. Updating Data with JDBC

**Notes:**  
To **update** data (INSERT, UPDATE, DELETE):

1. Use **Statement.executeUpdate(sql)** or **PreparedStatement.executeUpdate()**.  
2. **executeUpdate()** returns the number of rows affected (int).  
3. Use **PreparedStatement** with **setXXX()** for parameters to avoid SQL injection and improve reuse.  
4. By default, connections are in **auto-commit** mode; each statement commits immediately. To group operations, use **conn.setAutoCommit(false)**, then **conn.commit()** or **conn.rollback()**.

**Example:**
```java
String sql = "UPDATE users SET name = ? WHERE id = ?";
try (Connection conn = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "Bob");
    ps.setInt(2, 1);
    int rows = ps.executeUpdate();
    System.out.println("Updated rows: " + rows);
}
```

**Practice:**  
Write a program that inserts one row into a table using PreparedStatement (e.g., INSERT INTO test (id, name) VALUES (?, ?)), then runs an UPDATE that changes the name for that id, and prints the number of rows updated.

---

### MCQs – Updating Data with JDBC

1. **For INSERT/UPDATE/DELETE we use:**  
   (a) executeQuery()  
   (b) executeUpdate()  
   (c) execute() only  
   (d) getResultSet()  

2. **executeUpdate() returns:**  
   (a) ResultSet  
   (b) Number of rows affected  
   (c) boolean  
   (d) Connection  

3. **PreparedStatement.setString(1, "x") sets:**  
   (a) The first row  
   (b) The first placeholder (?) to "x"  
   (c) The column name  
   (d) The table name  

4. **To avoid SQL injection we should:**  
   (a) Use Statement with string concatenation  
   (b) Use PreparedStatement with parameter placeholders  
   (c) Use ResultSet only  
   (d) Disable connections  

5. **By default, after each executeUpdate(), the connection:**  
   (a) Rolls back  
   (b) Commits automatically (auto-commit)  
   (c) Closes  
   (d) Does nothing  

6. **What is the output of the following code if no row has id=999?**
```java
PreparedStatement ps = conn.prepareStatement("UPDATE t SET x=1 WHERE id=?");
ps.setInt(1, 999);
int n = ps.executeUpdate();
System.out.println(n);
```
   (a) -1  
   (b) 0  
   (c) 1  
   (d) Exception  

7. **To run multiple updates as one transaction we:**  
   (a) Use multiple connections  
   (b) setAutoCommit(false), run updates, then commit() or rollback()  
   (c) Use executeQuery()  
   (d) Cannot do that in JDBC  

8. **DELETE FROM table WHERE id = ? executed via PreparedStatement:**  
   (a) Returns a ResultSet  
   (b) Returns the number of deleted rows  
   (c) Returns boolean  
   (d) Does not support WHERE  

---

## 15. Assignment Questions (Covering Entire Syllabus)

Use these questions to test your understanding of Files, Collections, and JDBC.

---

### Assignment Question 1 (Files – Streams and File Class)

**Question:**  
(a) Differentiate between **byte streams** and **character streams** in Java. When would you use each?  
(b) What is the purpose of the **File** class? Can it read or write file content?  
(c) Give one example each of **text I/O** and **binary I/O** using appropriate classes.

---

### Assignment Question 2 (Random Access and Binary I/O)

**Question:**  
(a) What is **random access** in file I/O? Name the Java class used for it and one method that sets the current position.  
(b) How is **DataOutputStream** different from **PrintWriter** in terms of what they write and how?  
(c) Write a short code snippet that writes two integers to a binary file and then reads them back using DataInputStream.

---

### Assignment Question 3 (Collections Framework)

**Question:**  
(a) Describe the **hierarchy** of the Collection Framework: what are **List**, **Set**, and **Queue**? Is **Map** a sub-interface of Collection?  
(b) When would you choose **ArrayList** over **LinkedList**, and vice versa?  
(c) What is the difference between **HashSet** and **TreeSet** in terms of order and performance?

---

### Assignment Question 4 (ArrayList, LinkedList, Set, Queue)

**Question:**  
(a) Explain **PriorityQueue**: how does it order elements? How is it different from **ArrayDeque**?  
(b) Write code to add five strings to an **ArrayList**, then remove the element at index 2 and print the list.  
(c) Write code to add elements to a **HashSet** (including one duplicate) and print the size of the set.

---

### Assignment Question 5 (JDBC – Connection and Query)

**Question:**  
(a) List the main steps to **connect** to a database using JDBC (from loading driver to getting a Connection).  
(b) What does **ResultSet.next()** do? How do you read a column value in the current row?  
(c) Why is **PreparedStatement** preferred over **Statement** for queries with user input?

---

### Assignment Question 6 (JDBC – Updating Data)

**Question:**  
(a) Which method do you use to run an **INSERT** or **UPDATE** statement? What does it return?  
(b) What is **auto-commit**? How would you run multiple updates as a single **transaction**?  
(c) Write a short code snippet that uses PreparedStatement to **insert** one row into a table with two columns (e.g., id and name).

---

## 16. Coding Questions (Hands-On Practice)

---

### Coding Question 1: File Operations (Text and Binary)

**Problem:**  
Write a Java program that:

1. Uses the **File** class to check if a file `scores.txt` exists. If not, create it.  
2. Writes three lines of text to `scores.txt` using **BufferedWriter** or **PrintWriter** (e.g., "Alice 90", "Bob 85", "Carol 95").  
3. Reads the file back using **BufferedReader** and prints each line.  
4. Creates a binary file `scores.bin` and writes the same three names and scores using **DataOutputStream** (e.g., writeUTF for name, writeInt for score).  
5. Reads `scores.bin` with **DataInputStream** and prints name and score for each record.

**Concepts tested:** File class, text I/O (Writer/Reader), binary I/O (DataInputStream/DataOutputStream), resource management (try-with-resources).

---

### Coding Question 2: Collections (List, Set, Queue)

**Problem:**  
Implement the following:

1. Create an **ArrayList** of at least 5 integers. Remove all elements that are less than 10. Print the list.  
2. Create a **HashSet** of strings. Add some strings including duplicates. Print the set size and its contents.  
3. Create a **PriorityQueue** of integers. Add 5 integers (not in sorted order). Remove elements with **poll()** and print each until the queue is empty. Verify that they come out in sorted order.  
4. Use an **ArrayDeque** as a **stack**: push three strings, then pop and print each. Then use the same ArrayDeque as a **queue**: offer three strings, then poll and print each.

**Concepts tested:** ArrayList, HashSet, PriorityQueue, ArrayDeque, List/Set/Queue interfaces, iteration and removal.

---

### Coding Question 3: JDBC – Query and Update

**Problem:**  
Write a Java program using JDBC that:

1. Connects to a database (e.g., MySQL or any DB you have). Use try-with-resources for Connection.  
2. Creates a table if it does not exist (e.g., `CREATE TABLE IF NOT EXISTS students (id INT PRIMARY KEY, name VARCHAR(50))`). Use **executeUpdate()**.  
3. Inserts at least 2 rows using **PreparedStatement** (e.g., INSERT INTO students (id, name) VALUES (?, ?)).  
4. Runs a **SELECT** query and prints all rows (id and name) using **ResultSet**.  
5. Runs an **UPDATE** that changes the name of one student by id. Print the number of rows updated.  
6. Handles **SQLException** and prints a meaningful message.

**Concepts tested:** DriverManager.getConnection(), Statement/PreparedStatement, executeUpdate(), executeQuery(), ResultSet (next(), getInt(), getString()), exception handling, closing resources.

---

## Answer Key (Summary)

| Section | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|--------|----|----|----|----|----|----|----|-----|
| 1. Streams | b | b | b | b | b | b | b | b |
| 2. Text I/O | b | b | c | b | b | b | b | b |
| 3. Binary I/O | b | b | a | b | b | b | b | b |
| 4. Random Access | b | b | b | b | b | b | b | b |
| 5. File class | b | b | b | b | b | b | b | b |
| 6. Collections overview | b | b | b | b | b | b | b | b |
| 7. Hierarchy | b | b | b | b | b | b | b | b |
| 8. Interfaces | b | b | b | b | b | b | b | c |
| 9. ArrayList/LinkedList | b | b | b | b | b | a | b | b |
| 10. HashSet/TreeSet | b | b | b | b | b | b | b | b |
| 11. PriorityQueue/ArrayDeque | b | b | b | b | b | b | b | c |
| 12. JDBC Connect | b | b | b | b | b | b | b | b |
| 13. Query/Results | b | b | b | b | b | b | b | b |
| 14. Updating JDBC | b | b | b | b | b | b | b | b |

---

*Use this document as PPT notes: each topic has a short note, example, practice idea, and 7–8 MCQs. At the end are 5–6 assignment questions and 2–3 coding practice questions. All code examples are in Java.*
