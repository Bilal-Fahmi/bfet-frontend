import { AnimatePresence, motion, useCycle } from "framer-motion";

const sideVariants = {
  closed: {
    transition: {
      staggerChildern: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildern: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const links = [
  { name: "Home", to: "/admin/dashboard", id: 1 },
  { name: "Users", to: "/admin/users", id: 2 },
  { name: "Experts", to: "/admin/experts", id: 3 },
  { name: "Slots", to: "/admin/slots", id: 4 },
];
const Slider = () => {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <main className="flex">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 300 }}
            exit={{
              width: 0,
              transition: { delay: 0.2, duration: 0.3 },
            }}
            className="bg-black w-72 h-screen"
          >
            <motion.div
              className="m-12"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {links.map(({ name, to, id }) => (
                <motion.a
                  key={id}
                  href={to}
                  className="text-white no-underline text-lg semibold block m-5"
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      {open ? (
        <button
          className="flex text-4xl text-black items-center cursor-pointer fixed left-10 top-2 z-50"
          onClick={cycleOpen}
        >
          X
        </button>
      ) : (
        <svg
          onClick={cycleOpen}
          className="fixed  z-30 flex items-center cursor-pointer left-10 top-5"
          fill="#000000"
          viewBox="0 0 100 90"
          width="25"
          height="25"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
    </main>
  );
};

export default Slider;
