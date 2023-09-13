
import type { Offer } from '../../../shared/interfaces'
interface SuccessPaymentProps {
    selectedOffer: Offer;
    setIsOpen: (open: boolean) => void;
    setSteps: (steps: number) => void;
}
const SuccessPayment = ({selectedOffer, setIsOpen, setSteps}: SuccessPaymentProps) => {
    return (
        <div className={"h-full w-full flex flex-col items-center justify-center"}>
            <span>Paiement effectué avec Succes</span>
            <span>Vous obtenez {selectedOffer.numberTokens} cours pour vous inscrire!</span>
            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#f46ef6] px-4 py-2 text-sm font-medium text-white hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {setIsOpen(false); setSteps(0);}}
                >
                    Fermer
                </button>
            </div>
        </div>
    )
}

export default SuccessPayment;