import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import {
  ArrowDown,
  HeartEmpty,
  HeartFull,
  LogoDesktop,
  NotificationTrue,
  Wishlist,
} from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../store/slices/authSlice";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import NotificationsModal from "../components/NotificationsModal";
import { SelectedWishlist } from "../assets/icons/SelectedWishlist";
import { set } from "react-hook-form";

const initialNotifications = [
  // {
  //   id: 1,
  //   message: "No notifications currently",
  //   title: "No notifications currently",
  //   read: false,
  // },
  // {
  //   id: 2,
  //   message: "Notification 2",
  //   title: "Notification title",
  //   read: false,
  // },
  // {
  //   id: 3,
  //   message: "Notification 3",
  //   title: "Notification title",
  //   read: false,
  // },
  // Add more notifications as needed
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // useLocation istifadə edirik
  const user = JSON.parse(localStorage.getItem("user"));
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: localStorage.getItem("currency") || "£",
    name: localStorage.getItem("currencyName") || "GBP",
  });

  const currencies = [
    { symbol: "£", name: "GBP" },
    { symbol: "$", name: "USD" },
    { symbol: "€", name: "EUR" },
    { symbol: "₺", name: "TRY" },
  ];

  const handleCurrencyChange = (curr) => {
    localStorage.setItem("currency", curr.symbol);
    localStorage.setItem("currencyName", curr.name);
    setSelectedCurrency(curr);
    setCurrencyDropdownOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const level = localStorage.getItem("level");
    const storedUser =
      localStorage.getItem("user_id") in ["null", "undefined", null, undefined]
        ? null
        : localStorage.getItem("user_id");
    if (level && storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState);
  }, []);

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // const handleMarkSelectedRead = (selectedNotifications) => {
  //   setNotifications((prevNotifications) =>
  //     prevNotifications.map((notification) =>
  //       selectedNotifications.includes(notification.id)
  //         ? { ...notification, read: true }
  //         : notification
  //     )
  //   );
  // };

  const navLinks = [
    // { to: "/agents", label: "Agents" },
    // { to: "/about", label: "About us" },
    // { to: "/contacts", label: "Contacts" },
  ];

  const renderNavLinks = useCallback(() => {
    return navLinks.map(({ to, label }) => (
      <Link key={to} to={to} className="py-2 transition hover:text-[#A673EF]">
        {label}
      </Link>
    ));
  }, []);

  fetch("http://localhost:5001/api/v1/auth/refresh", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        window.location.href = "/login";
        localStorage.removeItem("user");
      }
      return res.json();
    })
    .then((data) => {
      if (data && data.user) {
        dispatch(setUser(data.user));
      }
    })
    .catch((error) => {
      localStorage.removeItem("user");
    });

  const renderAuthButtons = () => {
    if (user && user !== "undefined") {
      return (
        <>
          <div className="relative">
            <button
              className="flex justify-between  w-[104px] h-[35px] items-center gap-2 px-3 py-2 bg-gray-100 border border-transparent rounded-md hover:border-gray-300"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              <span>{selectedCurrency.symbol}</span>
              <span className="mx-1 text-[#525C76] text-[12p]">
                {selectedCurrency.name}
              </span>
              <span className="transform rotate-0">
                <ArrowDown />
              </span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg top-full w-100">
                {currencies.map((curr) => (
                  <button
                    key={curr.name}
                    onClick={() => handleCurrencyChange(curr)}
                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                  >
                    <span>{curr.symbol}</span> <span>{curr.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[120px] h-[34px] flex justify-center gap-2 items-center ">
            <div
              onClick={() => handleNavigation("/wishlist")}
              className=" cursor text-[#A673EF]  w-[34px] h-[34px] flex justify-center items-center"
            >
              {location.pathname === "/wishlist" ? (
                <SelectedWishlist />
              ) : (
                <Wishlist />
              )}
            </div>
            <div
              onClick={() => setNotificationsOpen(true)}
              className=" cursor w-[34px] h-[34px] flex justify-center items-center"
            >
              <NotificationTrue />
            </div>
            <div
              onClick={() => handleNavigation("/profile")}
              className=" cursor  w-[34px] h-[34px] rounded-full border border-[#A673EF]"
            >
              <img
                src={user.image_url}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            {/* <Button
            type="button"
            variant="secondary"
            onClick={handleLogout}
            className="px-[18.6px] py-[9.5px] cursor border rounded-md"
            >
            Log out
            </Button> */}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="relative">
            <button
              className="flex justify-between  w-[104px] h-[34px] items-center gap-2 px-3 py-2 bg-gray-100 border border-transparent rounded-md hover:border-gray-300"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              <span>{selectedCurrency.symbol}</span>
              <span className="mx-1 text-[#525C76] text-[12p]">
                {selectedCurrency.name}
              </span>
              <span className="transform rotate-0">
                <ArrowDown />
              </span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg top-full w-100">
                {currencies.map((curr) => (
                  <button
                    key={curr.name}
                    onClick={() => handleCurrencyChange(curr)}
                    className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                  >
                    <span>{curr.symbol}</span> <span>{curr.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[154px] h-[34px] flex justify-center gap-4 items-center ">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleNavigation("/login")}
              className=" w-[64px] h-[34px] transition-all duration-300 hover:bg-[#A673EF] hover:text-white border rounded-sm text-[14px] leading-[22.4px] font-semibold"
            >
              Log in
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => handleNavigation("/register")}
              className=" w-[64px] h-[34px] transition-all duration-300 hover:bg-hoverPrimary hover:text-white border rounded-sm text-[14px] leading-[22.4px] font-semibold"
            >
              Sign up
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <header className="bg-[#F9F8FF] min-w-full border-b-2 px-16.26 py-[14.5px] z-50 relative">
      <nav className="flex items-center justify-between w-full min-w-full mx-auto">
        <Link to="/" className="flex items-center">
          <LogoDesktop className="w-[120px] md:w-[180px]" />
        </Link>

        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 rounded-full bg-[#F9F8FF] shadow-md focus:outline-none transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle navigation"
        >
          <motion.div
            className="relative w-8 h-8"
            initial={{ rotate: 0 }}
            animate={{ rotate: menuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </motion.div>
        </button>

        <div className="hidden md:flex items-center gap-6 text-[#220D6D] text-[16px] leading-[28.8px] font-medium">
          {renderNavLinks()}
        </div>

        <div className="items-center hidden gap-6 md:flex">
          {renderAuthButtons()}
        </div>
      </nav>

      <motion.div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center justify-center fixed inset-0 bg-[#F9F8FF] z-50 p-6 transition-all duration-500 ease-in-out transform`}
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="flex items-center mb-8">
          <LogoDesktop className="w-[120px] md:w-[180px]" />
        </Link>

        <motion.button
          onClick={toggleMenu}
          className="absolute text-3xl text-black transition-all duration-300 transform top-4 right-4 hover:scale-110"
          aria-label="Close menu"
          whileHover={{ scale: 1.1 }}
        >
          &times;
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center w-full space-y-4 text-center"
        >
          {renderNavLinks()}
        </motion.div>

        <div className="flex items-center justify-center gap-6">
          {renderAuthButtons()}
        </div>
      </motion.div>

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onClearAll={handleClearAll}
        onMarkAllRead={handleMarkAllRead}
      />
    </header>
  );
};

export default Header;
