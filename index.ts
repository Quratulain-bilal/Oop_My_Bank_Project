#! /usr/bin/env node




import chalk from "chalk";
import inquirer from "inquirer";



// bank account interface

interface BankAccount{
    accountNumber:number;
    balance:number;

    //methods
    withdraw(amount:number):void
    Deposit(amount:number):void
    cheeckBalance():void
}

//class for bankaccount

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor (accountNumber:number,balance:number){
        this.accountNumber=accountNumber;
        this.balance=balance;
    }



    //method debit money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(chalk.bold.blue(`you have sucessfulluy withdraw ${chalk.bold.green(amount)}and your remaining balance is ${chalk.bold.green(this.balance)}`));
            }
    else{
        console.log(chalk.bold.blue("you have insufficient balance"));
        }
    }


//method creditmoney

Deposit(amount: number): void {
    if(amount > 100){
        //minus one dollar because on the deposit of 100 bank minus one dollar fee 
        amount-=1;  }

        this.balance += amount;
        console.log(chalk.bold.green(`you sucessfullu deposit ${chalk.bold.green(amount)} your new balane is ${chalk.bold.green(this.balance)}`));
        }


        //check balance

        cheeckBalance(): void {
            console.log(`current balance is ${chalk.bold.green(this.balance)}`);
            
        }

}
//customer class

class Customer{
    firstName:string;
    lastName:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    constructor(firstName:string,lastName:string,age:number,mobileNumber:number,account:BankAccount){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
        this.mobileNumber=mobileNumber;
        this.account=account
    }


}
// create bank account

const accounts:BankAccount[]=[
    new BankAccount (1122,45),
    new BankAccount (1133,100),
    new BankAccount (1144,90)
]

//create customers

const customer:Customer[]=[
    new Customer("anna","shah",33,98765544,accounts[0]),
    new Customer("shan","shah",65,6777888,accounts[1]),
    new Customer("maria","shah",77,87654433,accounts[2])
];
//function to intereact with bank account


async function services(){
    do{
        const accountNumberinput=await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:chalk.bold.green("enter your account number"),

        });
        const custom=customer.find(customer=>customer.account.accountNumber===accountNumberinput.accountNumber);
        if(custom){console.log(chalk.bold.green(`welcome ${chalk.bold.green(custom.firstName)}  ${chalk.bold.green(custom.lastName)}`));

        const ans =await inquirer.prompt([{
            name:"select",
            type:"list",
            message:chalk.bold.green("please select one option"),
            choices:["withdraw","deposit","checkbalance","exit"]
        }]);


       switch(ans.select) {
        case "deposit":
            const depositAmount=await inquirer.prompt({
                name:"amount",
                type:"number",
                message:chalk.bold.green("enter the amount you want to deposit")
            })
            custom.account.Deposit(depositAmount.amount);
            break;

            //second case

            case "withdraw":
                const withdrawAmount=await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:chalk.bold.green("enter the amount you want to withdraw")
                })
                custom.account.withdraw(withdrawAmount.amount);
                break;

                //third case

                case "checkbalance":
                
                custom.account.cheeckBalance();
                break;


                //last case

                case "exit":
                    console.log(chalk.bold.blue("exit from bank"));
                    return;
                }
        }
        else{
            console.log(chalk.bold.blue("invalid account number"));
            
        }

    } while(true)
}
services();


