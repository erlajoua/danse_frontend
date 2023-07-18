import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Chip } from '@mui/material'
import { STYLES } from '../shared/interfaces';

const DetailsModal = ({ isOpen, setIsOpen, coursDetails }: { isOpen: any, setIsOpen: any, coursDetails: any }) => {
  const [selectedUsers, setSelectedUsers] = useState<any>({});

  const handleClick = (index: any) => {
    setSelectedUsers((prevSelectedUsers: any) => ({
      ...prevSelectedUsers,
      [index]: !prevSelectedUsers[index]
    }));
  };


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { setIsOpen(false) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="min-w-[33%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Détails du cours
                </Dialog.Title>

                <div className="bg-white rounded-lg  z-[10000] overflow-hidden max-w-lg w-full opacity-100">
                  <div className="rounded-sm mt-2 p-1 font-bold flex justify-between items-center">
                    <span>{STYLES[coursDetails?.style]}</span>
                  </div>
                  <div>
                    {coursDetails?.niveau && <Chip label={coursDetails?.niveau} sx={{ mb: 2 }} />}
                    <span>
                      <div className="flex gap-2">
                        <EventIcon fontSize="small" />
                        <span>
                          {coursDetails?.jsemaine} {coursDetails?.jour} {coursDetails?.mois}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <ScheduleIcon fontSize="small" />
                        <span>
                          à {coursDetails?.heure}, durée {coursDetails?.duree}
                        </span>
                      </div>
                    </span>
                    {coursDetails?.enrolledUsers.length ? (
                      <div className="mt-6">
                        <span className="font-bold text-xl mb-2">Elèves inscrits :</span>
                        <ul className="flex flex-col">
                          {coursDetails?.enrolledUsers.length && coursDetails?.enrolledUsers.map((user: any, index: number) => (
                            <li key={index} className="flex flex-col">
                              <span onClick={() => handleClick(index)} className="cursor-pointer" style={{ 'fontWeight' : selectedUsers[index] ? 'bold' : 'normal' }}>
                                {user.prenom} {user.nom}
                              </span>
                              {selectedUsers[index] && <span className=" ml-4 italic underline">{user.email}</span>}
                              {selectedUsers[index] && <span className=" ml-4 italic underline">{user.tel}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : <div className="mt-6"><span className="mt-2">Aucun élève inscrit</span></div>}
                  </div>
                </div>

                <div className="mt-4 flex gap-2 justify-end mt-16">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-grey-100 px-4 py-2 text-sm font-medium text-[f46ef6] hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => { setIsOpen(false) }}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DetailsModal;