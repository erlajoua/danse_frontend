import type {Offer} from '../../../shared/interfaces'
import {useContext, useEffect, useState} from "react";
import {Context} from '../../../contexts/store'
import {api} from '../../../services/api';
import { ThreeDots } from 'react-loader-spinner'
import './Offers.css'
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";

interface CardFormProps {
    selectedOffer: Offer;
    setSteps: (steps: number) => void;
}

const CreditcardForm = ({selectedOffer, setSteps}: CardFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);
    const [name, setName] = useState('');
    const {token, setTokens} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null | undefined>(null);

    useEffect(() => {
        console.log("useEffect !!");
        handleAchat();
    }, [])

    const handleAchat = async () => {
        try {
            const {data} = await api.post('/payment/create-payment-intent', token, {amount: selectedOffer.price * 100}, {headers: {Authorization: `Bearer ${token}`}});
            setClientSecret(data.clientSecret);
            setName(data.name);
        } catch (error) {
            console.error("Error creating payment intent:", error);
        }
    };

    const stripeOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            }
        }
    };

    const handleSubmit = async (event: any) => {
        setError(null);
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return;

        const paymentDetails = {
            payment_method: {
                card: cardNumberElement,
                billing_details: {
                    name: name,
                },
            },
        };

        if (!clientSecret)
            return;

        stripe
            .confirmCardPayment(clientSecret, paymentDetails)
            .then(async (result) => {
                if (result.error) {
                    setError(result.error.message);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        const responseUpdate = await api.post('/users/updateTokens', token, { numberTokens: selectedOffer.numberTokens })
                        setTokens(responseUpdate.data.numberTokens);
                        setSteps(2);
                    } else {
                        console.log("Le paiement a été traité mais le statut est :", result.paymentIntent.status);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(`Une erreur s'est produite, veuillez réassayer.`);
                setLoading(false);
            });
    };

    return (
        <div className={"h-full flex flex-col justify-between"}>
            <div className={"flex flex-col bg-[rgba(244, 110, 246, 0.5)] rounded-md p-1 px-3 my-2 mb-1"}>
                <span className={"bold text-lg"}>Récapitulatif </span>
                <span>- {selectedOffer.numberTokens} cours</span>
                <span>- {selectedOffer.price}€</span>
            </div>
            <span className={"italic text-[#f46ef6] text-sm mb-1"}>Après cet achat vous obtiendrez les cours sur votre compte que vous pourrez utiliser afin de vous inscrire à un cours.</span>
            <div><form onSubmit={handleSubmit} className={"w-full flex gap-[-10%] flex-col"}>
                <div className="form-row w-full">
                    <label htmlFor="card-element">
                        Numéro de carte de crédit
                    </label>
                    <CardNumberElement
                        id="card-element"
                        options={stripeOptions}
                    />
                </div>
                <div className="form-row flex gap-3">
                    <div className={"w-1/2 flex flex-col"}>
                        <label htmlFor="card-exp-element">
                            Date d'expiration
                        </label>
                        <CardExpiryElement
                            className={"w-full flex flex-col"}
                            id="card-exp-element"
                            options={stripeOptions}
                        />
                    </div>
                    <div className={"w-1/2 flex flex-col"}>
                        <label htmlFor="card-cvc-element">
                            CVC
                        </label>
                        <CardCvcElement
                            className={"w-full flex flex-col"}
                            id="card-cvc-element"
                            options={stripeOptions}
                        />
                    </div>
                </div>
            </form>
                {error && (<div className={"w-full flex items-center justify-center"}>
                    <span className={'text-red-500'}>{error}</span>
                </div>)}
                { !loading ? (
                <div className="flex gap-2 justify-end">
                <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-grey-100 px-4 py-2 text-sm font-medium text-[f46ef6] hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => {
                setSteps(0)
            }}
        >
            Précedent
        </button>
    <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-[#f46ef6] px-4 py-2 text-sm font-medium text-white hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={handleSubmit}
    >
        Payer
    </button>
                </div>) : (<div className={"w-full flex items-center justify-center"}><ThreeDots
                    height="60"
                    width="60"
                    radius="7"
                    color="#f46ef6"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></div>)}</div>
        </div>
    )
}

export default CreditcardForm;