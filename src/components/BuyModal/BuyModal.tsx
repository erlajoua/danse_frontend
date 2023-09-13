import {Fragment, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Offers from './components/Offers'
import CreditcardForm from './components/CreditcardForm'
import SuccessPayment from './components/SuccessPayment'
import './BuyModal.css'
import type {Offer} from '../../shared/interfaces'
import {OFFERS} from '../../shared/interfaces'

const BuyModal = ({ isOpen, setIsOpen}: {isOpen: any, setIsOpen: any}) => {
    const [selectedOffer, setSelectedOffer] = useState<Offer>(OFFERS[0]);
    const [steps, setSteps] = useState(0);

    const onClose = () => {
        setIsOpen(false);
        setSteps(0);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative h-full z-[990]" onClose={onClose}>
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 overflow-y-auto h-full">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="h-[450px] w-[35%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col justify-between">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Achat de cours
                                </Dialog.Title>
                                { steps === 0 && (<Offers
                                        setSteps={setSteps}
                                        setIsOpen={setIsOpen}
                                        setSelectedOffer={setSelectedOffer}
                                        selectedOffer={selectedOffer}
                                    />
                                    )}
                                { steps === 1 && (<CreditcardForm
                                        setSteps={setSteps}
                                        selectedOffer={selectedOffer}
                                    />
                                   )}
                                { steps === 2 && (<SuccessPayment
                                    selectedOffer={selectedOffer}
                                    setIsOpen={setIsOpen}
                                    setSteps={setSteps}
                                />)}
                            </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BuyModal;