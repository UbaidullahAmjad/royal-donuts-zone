
const PizzaTopping = ({ topping, toppingAmount }) => {

    let toppings = [];

    for (let i = 1; i <2; i++) {
        toppings.push(<div key={`${topping + i}`} className={`topping ${topping} ${topping}-${i} `} ></div>);
    }

    return toppings;
}

export default PizzaTopping