import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function About(props) {
    const cancelButtonRef = useRef(null)

    const maintainer = { name: 'Diky Hadna', username: '@dkhd', link: 'https://github.com/dkhd' }
    const contributors = [
        { name: 'John Doe', username: '@jondoe', link: 'https://github.com/' },
        { name: 'Diky Hadna', username: '@dkhd', link: 'https://github.com/dkhd' }
    ]
    
    const handleCloseModal = () => {
        props.toggleModal(false)
    }
    
    return(
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleCloseModal}>
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
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-gray-50 text-lg font-medium text-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            About
                        </div>
                        <div className="bg-white text-justify sm:p-4 sm:pb-2">
                            Winterly Tab is an open source chrome extension to beautifully change your new tab page with winter-themed background.
                        </div>
                        <div className="bg-white sm:p-4 sm:pb-2">
                            <div className="sm:flex sm:items-start font-medium">
                                Maintainer:
                            </div>
                            <div className="sm:flex sm:justy-items-center">
                                <div>
                                    {maintainer.name} &nbsp; 
                                    <a className="text-blue-600" href={maintainer.link}>
                                        {maintainer.username}
                                    </a>
                                </div>
                            </div>
                            <div className="sm:flex sm:items-start font-medium">
                                Contributors:
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                {contributors.map(c => {
                                    return <div className="flex-initial">
                                        {c.name} &nbsp; 
                                        <a className="text-blue-600" href={c.link}>
                                            {c.username}
                                        </a>
                                    </div>
                                })}
                            </div>
                            <div className="font-bold text-lg pt-3">
                                <a href="https://github.com/dkhd/winterly-tab">Github</a>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
    )
}

export default About;