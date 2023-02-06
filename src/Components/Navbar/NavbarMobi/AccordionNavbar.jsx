import React from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export class AccordionNavbar extends React.Component {
    state = {
        open: this.props.open
    };

    toggleSection = (index) => () => {
        this.setState(({ open }) => ({
            open: index === open ? undefined : index
        }));
    };

    render() {
        return (
            <div className={`accordion ${this.props.className}`}>
                {React.Children.map(this.props.children, (child, index) => {
                    if (child.type !== AccordionItem) return null;
                    return React.cloneElement(child, {
                        isOpen: child.props.open || this.state.open === index,
                        onClick: this.toggleSection(index)
                    });
                })}
            </div>
        );
    }
}

AccordionNavbar.propTypes = {
    open: PropTypes.number
};

const AccordionItem = ({ children, isOpen, onClick }) => (
    <Card className={children.className}>
        {React.Children.map(children, (child) => {
            if (child.type === AccordionHeader) {
                return React.cloneElement(child, { onClick, isOpen });
            }

            if (child.type === AccordionBody) {
                return React.cloneElement(child, { isOpen });
            }

            return null;
        })}
    </Card>
);

const AccordionHeader = ({ children, isOpen, onClick }) => (
    <CardHeader className={children.className}>
        <h5 className="mb-0">
            <Button
                color="link"
                onClick={onClick}
            >
                <span className="title">{children}</span>
                <span className="icon">{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
            </Button>
        </h5>
    </CardHeader>
);

const AccordionBody = ({ children, isOpen }) => (
    <Collapse isOpen={isOpen} className={children.className}>
        <CardBody>{children}</CardBody>
    </Collapse>
);

AccordionNavbar.Item = AccordionItem;
AccordionNavbar.Header = AccordionHeader;
AccordionNavbar.Body = AccordionBody;
