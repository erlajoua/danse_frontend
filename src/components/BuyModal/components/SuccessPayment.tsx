
import type { Offer } from '../../../shared/interfaces'
interface SuccessPaymentProps {
    selectedOffer: Offer;
    setIsOpen: (open: boolean) => void;
    setSteps: (steps: number) => void;
}
const SuccessPayment = ({selectedOffer, setIsOpen, setSteps}: SuccessPaymentProps) => {
    return (
        <div className={"h-full w-full flex flex-col items-center justify-center"}>
            <div className={"h-full w-full flex items-center flex-col justify-between"}>
                <div className={"flex flex-col h-full justify-center gap-4 items-center"}>
                    <span className={"text-2xl text-[#f46ef6]"}>Paiement effectué avec succès!</span>
                    <span>Vous avez obtenu <span className={"font-bold"}>{selectedOffer.numberTokens}</span> cours pour vous inscrire.</span>
                </div>
                <div className="flex gap-2 w-full justify-end">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#f46ef6] px-4 py-2 text-sm font-medium text-white hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {setIsOpen(false); setSteps(0);}}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessPayment;