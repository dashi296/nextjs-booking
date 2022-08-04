import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

type BooksContextState = {
  books: string[];
  addBook: (id: string) => void;
};

const initialState: BooksContextState = {
  books: [],
  addBook: () => {},
};

export const BooksContext = createContext(initialState as BooksContextState);

export const BooksProvider = ({ children }: PropsWithChildren) => {
  const initializedRef = useRef(false);
  const [books, setBooks] = useState<string[]>([]);

  const addBook = (id: string) => {
    setBooks((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    console.warn("localstorage get");
    const booksFromStorage = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(booksFromStorage);
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!initializedRef.current) {
      return;
    }
    console.warn("localstorage set: ", books);
    localStorage.setItem(
      "books",
      `[${books.map((book) => `"${book}"`).join(",")}]`
    );
  }, [books]);

  return (
    <BooksContext.Provider value={{ books, addBook }}>
      {children}
    </BooksContext.Provider>
  );
};
