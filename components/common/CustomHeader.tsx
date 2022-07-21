const CustomHeader = () => {
  return (
    <header className="py-4 bg-white shadow">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Booking Demo</div>

        <ul className="flex justify-center items-center">
          <li className="px-4">Menu1</li>
          <li className="px-4">Menu2</li>
          <li className="px-4">Menu3</li>
        </ul>
      </nav>
    </header>
  );
};

export default CustomHeader;
