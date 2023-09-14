import type {Offer} from '../../../shared/interfaces'
import { OFFERS } from '../../../shared/interfaces'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import './Offers.css'
import {useContext} from 'react';
import { Context } from '../../../contexts/store'
interface OffersProps {
    setSteps: (steps: number) => void;
    selectedOffer: Offer;
    setSelectedOffer: (offer: Offer) => void;
    setIsOpen: (open: boolean) => void;
}

const Offers = ({setSteps, selectedOffer, setIsOpen, setSelectedOffer}: OffersProps) => {
    const { tokens } = useContext(Context);

    const handleOfferChange = (index: number) => {
        setSelectedOffer(OFFERS[index]);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSteps(0);
    }

    return (
        <div className={"h-full flex flex-col justify-between"}>
            <div className={"h-full flex items-center flex-col justify-around"}>
                <div className={"flex flex-col"}>
                    <span className={"w-full mb-1 text-lg"}>Vous avez actuellement <span className={"font-bold"}>{tokens}</span> cours sur votre compte.</span>
                    <span className={"w-full mb-2 text-md italic"}>Selectionnez une offre pour acheter des cours qui seront utilisés à chaque inscription à un cours.</span>
                </div>
                    <div className="h-1/2 flex w-full justify-center gap-4">
                {OFFERS.map((offer, index) => (
                    <Card key={index} onClick={() => handleOfferChange(index)} className={selectedOffer === offer ? 'selected-offer w-[30%] cursor-pointer' : 'w-[30%] cursor-pointer'}>
                        <CardContent className={"p-1 flex flex-col justify-between h-full items-center"}>
                            <div>
                                <Typography variant="h6" component="div">
                                    {`${offer.numberTokens} cours`}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" className={"text-center"}>
                                    {`${offer.price}€`}
                                </Typography>
                            </div>
                            <Typography className={index === 0 ? ' truncate text-base md:text-lg  text-center text-gray-600  w-full tracking-[-1rem] h-1/2 flex items-center mt-4 justify-center' : 'truncate  text-base md:text-lg tracking-[-1rem] w-full text-center text-[#f46ef6] h-1/2 flex items-center justify-center mt-4'}>
                                {`${offer.sentence}`}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            </div>
            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-grey-100 px-4 py-2 text-sm font-medium text-[f46ef6] hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleClose}
                >
                    Annuler
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#f46ef6] px-4 py-2 text-sm font-medium text-white hover:bg-[#f4b8f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {setSteps(1)}}
                >
                    Suivant
                </button>
            </div>
        </div>
    )
}

export default Offers;