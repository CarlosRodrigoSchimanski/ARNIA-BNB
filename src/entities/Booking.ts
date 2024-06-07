export interface IBooking{
    number:number,//Número do quarto.
    type: 'individual'| 'duplo'| 'suíte'
    guest_capacity:number, //Capacidade máxima de hóspedes no quarto.
    daily_rate:number, //Valor da diária do quarto.
    photo:string, //Foto do quarto.
    status: 'disponível' | 'ocupado' | 'em manutenção'; //Status do quarto (por exemplo, "disponível", "ocupado", "em manutenção").
}