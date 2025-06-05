export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 text-center mt-16 rounded-t-2xl">
      <div>
        © {new Date().getFullYear()} Holistic Copy Lab. Sva prava pridržana.
      </div>
      <div className="text-xs mt-2">
        Izrada: Holistic Copy Lab Team | Powered by AI & Copywriting
      </div>
    </footer>
  );
}
