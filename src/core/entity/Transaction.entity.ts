interface Transaction {
    id: number;
    value: number;
    origin: string;
    destiny: string;
    description: string;
    emission_date: Date;
}

export default Transaction;
