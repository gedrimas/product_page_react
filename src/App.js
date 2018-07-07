import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import {Form} from "./mass";
import logot from "./foto.jpg"
import {mass} from "./mass";

class FormTest extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: mass[1],
            priceval: 100,
            amount: 1
        }

        this.inputhandle = this.inputhandle.bind(this);
        this.formsubmit = this.formsubmit.bind(this);
        this.choseprice = this.choseprice.bind(this);
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
    }

    inputhandle(e){
        this.setState({
            value: e.target.value
        });
    }

    formsubmit(e) {
        let obj = {};
        for (let i = 0; i < mass.length; i++) {
            if (mass[i].code === this.state.value) {
                obj = mass[i];
            }
        }
        this.setState({
            data: obj
        });
        e.preventDefault();
    }

    choseprice(e){
        let price = e.target.name;
        this.setState({
            priceval: price
        });
    }

    plus(){
        this.setState((prevState) => ({
            amount: prevState.amount + 1
        }));
    }

    minus(){
        this.setState((prevState) => ({
            amount: prevState.amount === 0 ? 0 : prevState.amount - 1
        }));
    }



    render() {

        function Cost(props) {
            return <div className="cost"><b>{props.prices}</b> <span className="serp">&#9773;</span> </div>
        }

        function GetItmCode(){
            let li = mass.map(itm => <li>{itm.code}</li>);
            return <ul>Коды товаров для теста{li}</ul>;
        }




        return (
            <div>
                <div className="products_section">

                    <form onSubmit={this.formsubmit} className="formseach">
                        <input type="text" value={this.state.value} onChange={this.inputhandle} className="seach"/>
                        <input type="submit" value="Поиск" />
                    </form>

                    <div className="img">
                        <img src={logot} alt="logotip" />
                    </div>

                    <div className="description">
                        <span className="product_code">Код: {this.state.data.code}</span>
                        <p href="#" className="product_description">{this.state.data.description}</p>
                    </div>

                    <div className="accessory">
                        <p>Могут понадобиться:</p>
                        {
                            this.state.data.assocProducts.split(';').map(itm =>
                                <a href="#">{itm}</a>
                            )
                        }
                    </div>

                    <div className="order">
                        <span className="product_status">Наличие {this.state.data.isActive}</span>
                        <p></p><p></p>
                        <Cost prices = {(this.state.priceval === 'priceGoldAlt' ? this.state.data.priceGoldAlt :
                            this.state.priceval === 'priceRetailAlt' ? this.state.data.priceRetailAlt :
                                this.state.priceval === 'priceGold' ? this.state.data.priceGold : this.state.data.priceRetail).toFixed(2)
                        } />

                        <div className="prices">
                            <a href="#" name='priceGoldAlt' onClick={this.choseprice} className="ng-binding">цена по карте за м.кв.</a><br />
                            <a href="#" name='priceRetailAlt' onClick={this.choseprice} className="ng-binding">цена стандартная за м.кв.</a><br />
                            <a href="#" name='priceGold' onClick={this.choseprice} className="ng-binding">цена по карте за упаковку</a><br />
                            <a href="#" name='priceRetail' onClick={this.choseprice} className="ng-binding">цена стандартная за м.кв.</a>
                        </div>
                        <br />
                        <br />
                        <input className="product__count" type="text" value={this.state.amount} />
                        <button onClick={this.plus}>+</button>
                        <button onClick={this.minus}>-</button>
                        <span className="ng-binding"><button data-product-id={this.state.data.code}>В корзину</button></span>
                    </div>
                </div>
                <GetItmCode />
            </div>
        )
    }
}



export default FormTest;
