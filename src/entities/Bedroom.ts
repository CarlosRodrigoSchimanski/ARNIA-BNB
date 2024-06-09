export interface IBedroom{
  number:number,
  type: 'individual'| 'duplo'| 'suíte'
  guest_capacity:number,
  daily_rate:number,
  photo:string,
  status: 'disponível' | 'ocupado' | 'em manutenção';
}