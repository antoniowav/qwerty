import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const HamburgerMenu = (props) => {
  const data = props.data;
  const { status, data: session } = useSession();
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
    >
      <div className="relative p-2">
        <Menu
          customBurgerIcon={<HamburgerIcon />}
          width={"auto"}
          className="left-0 top-12"
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
        >
          <Link
            style={{ margin: "0", color: "#FFFFFF" }}
            href="/"
            onClick={closeSideBar}
          >
            HOME
          </Link>
          <div
            style={{
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column",
            }}
          >
            <div style={{ fontStyle: "10px", color: "#FFFFFF" }}>PRODUCTS:</div>
            {data &&
              data.map((cat) => (
                <div key={cat._id}>
                  <Link
                    style={{
                      marginLeft: "10px",
                      marginTop: "20px",
                      color: "#bdc3c7",
                      fontWeight: "bold",
                    }}
                    href={`/category/${cat.name}`}
                    
                    onClick={closeSideBar}
                  >
                    <h3>All {cat.name}</h3>
                  </Link>
                  {cat.brands &&
                    cat.brands.map((brand) => (
                      <Link
                        href={`/${brand.brandName}`}
                        key={brand._id}
                        onClick={closeSideBar}
                      >
                        {brand.brandName}
                      </Link>
                    ))}
                </div>
              ))}
          </div>
          <Link
            style={{ margin: "0", color: "#FFFFFF" }}
            href="/faq"
            onClick={closeSideBar}
          >
            FAQ
          </Link>
          <Link
            style={{ margin: "0", color: "#FFFFFF" }}
            href="/contact"
            onClick={closeSideBar}
          >
            CONTACT
          </Link>

          <div>
            {status === "loading" ? (
              "LOADING"
            ) : session?.user ? (
              <>
                <div style={{ fontStyle: "10px", color: "#FFFFFF" }}>
                  MY ACCOUNT
                </div>
                <Link href="/profile" onClick={closeSideBar}>
                  Profile
                </Link>
                {session.user.isAdmin && (
                  <Link href="/admin/dashboard" onClick={closeSideBar}>
                    Admin Dashboard
                  </Link>
                )}
                <div style={{ marginLeft: "15px" }} onClick={logoutHandler}>
                  Logout
                </div>
              </>
            ) : (
              <Link href="/login " onClick={closeSideBar}>
                LOGIN
              </Link>
            )}
          </div>
        </Menu>
      </div>
    </div>
  );
};

const HamburgerIcon = () => (
  <div className="p-1/2" style={{ color: "black" }}>
    <svg
      className="w-8 h-8 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </div>
);

export default HamburgerMenu;
