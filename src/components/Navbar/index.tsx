import { ReactNode, useContext, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { logout } from '../../apiCalls/logout';
import { UserDataContext } from '../../providers/UserDataProvider';

interface PropsType {
  to: string;
  children: ReactNode;
}

interface ChildrenTypes {
  selected: 'admin' | 'dashboard' | 'wallet' | 'profile' | 'auction';
}

function CustomLink({ to, children }: PropsType) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'text-purple-900' : ''}>
      <Link to={to} className="flex flex-row">
        {children}
      </Link>
    </li>
  );
}

export default function Navbar({ selected }: ChildrenTypes) {
  const userInfo = useContext(UserDataContext);
  const [sidebarClosed, setSidebarClosed] = useState<boolean>(true);

  function sideBarState() {
    setSidebarClosed(!sidebarClosed);
  }

  async function executeLogout() {
    await logout();
    userInfo.setUserLogged('');
  }

  let navbarButtonDashboard = 'text-white';
  let navbarButtonWallet = 'text-white';
  let navbarButtonProfile = 'text-white';
  let navbarButtonAuction = 'text-white';
  let navbarButtonAdmin = 'text-white';

  const selectedNavbar = (selectedItem: string) => {
    switch (selectedItem) {
      case 'admin':
        navbarButtonAdmin = 'text-purple-800';
        break;
      case 'dashboard':
        navbarButtonDashboard = 'text-purple-800';
        break;
      case 'wallet':
        navbarButtonWallet = 'text-purple-800';
        break;
      case 'profile':
        navbarButtonProfile = 'text-purple-800';
        break;
      case 'auction':
        navbarButtonAuction = 'text-purple-800';
        break;
      default:
        navbarButtonAdmin = 'text-white';
        break;
    }
  };

  selectedNavbar(selected);
  return (
    <>
      {sidebarClosed ? (
        <nav className="absolute z-50  flex flex-col justify-between py-3 px-3 bg-[#16162D] h-full text-white">
          <div>
            <div className="flex sm:flex-col items-center mb-12">
              <div
                onClick={sideBarState}
                className="w-[30px] bg-no-repeat h-10 bg-menu-white bg-contain border-none mr-3"
              />
            </div>
            <div className="not-italic font-bold text-sm leading-5 ">
              <ul>
                <CustomLink to="/admin">
                  <div className="w-5 h-5 mb-4 mr-3 bg-dashboard bg-contain border-none bg-center bg-no-repeat" />
                </CustomLink>
              </ul>
            </div>
          </div>

          <Link
            onClick={executeLogout}
            to="/home"
            className="flex flex-row items-center mb-12"
          >
            <div className="w-6 h-6 mr-1 bg-logout bg-contain border-none" />
          </Link>
        </nav>
      ) : (
        <nav className="fixed z-50 flex flex-col justify-between py-3 px-3 bg-[#16162D] h-full text-white">
          <div>
            <div className="flex items-center mb-12">
              <div
                onClick={sideBarState}
                className="mr-2 w-[30px] h-10 bg-no-repeat bg-menu-white bg-contain border-none"
              />
              <div
                onClick={sideBarState}
                className="ml-4 mr-2 mb-1 w-[30px] h-10 bg-no-repeat bg-auction bg-contain border-none"
              />
              <p className="not-italic font-bold text-base leading-7">
                Auction
              </p>
            </div>
            <div className="not-italic font-bold text-sm leading-5">
              <ul>
                <CustomLink to="/admin">
                  <div className="w-5 h-5 mb-4 mr-8 ml-0 bg-dashboard bg-contain border-none bg-center bg-no-repeat" />
                  <p className={`${navbarButtonDashboard} `}>Admin</p>
                </CustomLink>
              </ul>
            </div>
          </div>

          <Link
            onClick={executeLogout}
            to="/home"
            className="flex flex-row items-center mb-12"
          >
            <div className="w-6 h-6 mr-2 bg-logout bg-contain border-none" />
            <p className="not-italic font-bold text-lg leading-5 ml-8">Sair</p>
          </Link>
        </nav>
      )}
    </>
  );
}
