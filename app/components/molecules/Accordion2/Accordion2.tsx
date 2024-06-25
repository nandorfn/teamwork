import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";

const Accordion2 = ({
  title,
  children
}: {
  title: string,
  children: React.ReactNode
}) => {
    return (
        <>
        <Accordion type="single" collapsible>
              <AccordionItem value={title}>
                <AccordionTrigger className="text-lg font-medium">{title}</AccordionTrigger>
                <AccordionContent>
                  {children}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </>
    );
};

export default Accordion2;