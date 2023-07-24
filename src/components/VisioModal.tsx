import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Connexion',
    description: [`Entrez dans la réunion AU MOINS 10 min avant le début de la classe,`, `afin que je m’assure de la bonne mise en place de votre caméra et vérifier que votre espace au sol est optimal.`],
  },
  {
    label: 'Lumière',
    description:
      ['Réglez la lumière afin que je puisse bien vous voir sur zoom'],
  },
  {
    label: 'Espace',
    description: [`Assurez-vous d’avoir assez d’espace au sol quand vous vous allongez avec vos bras ouverts en croix (bougez les meubles si besoin !)`],
  },
  {
    label: 'Caméra',
    description: [`Orientez l’angle de la caméra vers votre corps. Dirigez votre tête vers la caméra et alignez votre colonne vertébrale avec votre caméra. NE dirigez PAS vos pieds vers la caméra.`],
  },
  {
    label: 'Vêtements',
    description: [`Mettez des vêtements confortables et si possible de couleurs claires. En visioconférence, le noir est à proscrire. De même il est préférable de remonter vos cheveux afin d’avoir une NUQUE DÉGAGÉE.`],
  }
];

const VisioModal = ({ isOpen, setIsOpen, coursDetails }: { isOpen: boolean, setIsOpen: Function, coursDetails: any }) => {
  const [activeStep, setActiveStep] = useState(0);

  console.log("coursDetails = ", coursDetails);

  useEffect(() => {
    setActiveStep(0);
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveStep(0);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={handleClose}>
        <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-black bg-opacity-25">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="transform transition-all p-6 bg-white shadow-xl rounded-xl max-w-xl py-8 min-w-[33%]">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4 flex justify-center align-items-center">
                Instructions pour cours en visio
              </Dialog.Title>

              <Box sx={{ maxWidth: 600, width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical" className="w-full mb-4">
                  {steps.map((step, index) => (
                    <Step key={step.label} >
                      <StepLabel
                        className="w-full cursor-pointer"
                        onClick={() => { if (index < activeStep) setActiveStep(index) }}
                        optional={index === steps.length - 1 ? <Typography variant="caption"></Typography> : null}
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Box className="flex flex-col gap-1">
                          {step.description.map((desc, indeex) => {
                            return (
                              <Typography key={indeex}>{desc}</Typography>
                            )
                          })}
                        </Box>
                        <Box sx={{ mb: -1 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              OK
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                <Box className="flex align-items-center justify-center">
                  {activeStep === steps.length && (
                    <a href={coursDetails.zoomLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outlined" color="primary">
                        REJOINDRE LA VISIO
                      </Button>
                    </a>
                  )}
                </Box>

              </Box>

              <div className="flex justify-between w-full">
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 text-[#f46ef6] py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${activeStep >= steps.length - 1 ? 'invisible' : ''}`}
                  onClick={() => { setActiveStep(steps.length) }}
                >
                  Passer
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleClose}
                >
                  Fermer
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default VisioModal;
