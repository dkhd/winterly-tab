import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from 'prop-types';

function About({open, toggleModal}) {
  const cancelButtonRef = useRef(null);

  const maintainer = {
    name: "Diky Hadna",
    username: "@dkhd",
    link: "https://github.com/dkhd",
    avatar_url: "https://avatars.githubusercontent.com/u/3040839?v=4"
  };
  const contributors = [
    {
      name: "Sander Nobel",
      username: "@sano2019",
      link: "https://github.com/sano2019",
      avatar_url: "https://avatars.githubusercontent.com/u/53917461?v=4"
    },
    {
      name: "Jeff Canale",
      username: "@je-poy",
      link: "https://github.com/je-poy",
      avatar_url: "https://avatars.githubusercontent.com/u/19700174?v=4"
    },
  ];

  const handleCloseModal = () => {
    toggleModal(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleCloseModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-nord0 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-nord6 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-5">
              <div className="bg-nord6 text-2xl font-medium text-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                About
              </div>
              <div className="bg-nord6 text-justify sm:p-4 sm:pb-2">
                Winterly Tab is an open source chrome extension to beautifully
                change your new tab page with winter-themed background.
              </div>
              <div className="bg-nord6 sm:p-4 sm:pb-2">
                <div className="sm:flex sm:items-center sm:justify-center align-middle font-medium text-xl">
                  Maintainer:
                </div>
                <div className="sm:flex sm:justy-items-center sm:justify-center">
                  <div className="flex-shrink-0 h-12 w-12 sm:items-center">
                    <img className="h-12 w-12 rounded-full" src={maintainer.avatar_url} alt="DH" />
                  </div>
                  <div className="flex ml-4 sm:items-center">
                    <div className="font-medium text-gray-900">
                      {maintainer.name} &nbsp;
                      (<a
                        className="text-nord10 font-semibold"
                        href={maintainer.link}
                      >
                        {maintainer.username}
                      </a>)
                    </div>
                  </div>
                </div>
                <div className="sm:flex sm:items-start font-medium sm:justify-center mt-5 text-xl">
                  Contributors:
                </div>
                <div className="flex flex-col sm:justify-center gap gap-1 ">
                  {contributors.map((c,index) => {
                    return (
                      <div key={index} className="sm:flex sm:justy-items-stretch sm:justify-center gap gap-4">
                        <div className="flex-shrink-0 h-12 w-12 sm:items-center">
                          <img className="h-12 w-12 rounded-full" src={c.avatar_url} alt="DH" />
                        </div>
                        <div className="flex sm:items-center">
                          <div className="font-medium text-gray-900">
                            {c.name}
                          </div>
                        </div>
                        <div className="flex sm:items-center">
                          (<a
                            className="text-nord10 font-semibold"
                            href={c.link}
                          >
                            {c.username}
                          </a>)
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="font-bold text-lg pt-3 text-nord10 mt-5">
                  <a
                    href="https://github.com/dkhd/winterly-tab"
                    className="flex flex-row justify-center items-center gap-1"
                  >
                    <span>Github</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="bg-nord6 px-4 py-3 sm:px-6 sm:flex">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center mx-auto rounded-md border border-nord10 shadow-sm px-4 py-2 bg-nord6 text-base font-medium text-nord10 hover:text-nord6 hover:bg-nord10 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

About.propTypes = {
  open: PropTypes.bool,
  toggleModal: PropTypes.func
}

export default About;
