import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalService } from '../services/external.services';
import { Router } from '../../../node_modules/@angular/router';
import { SelectComponent, SelectItem } from 'ng2-select';
import { ToastrService } from 'ngx-toastr';

import { Coins } from '../models/Coins';
import { Currency } from '../models/Currency';
import { Conversion } from '../models/Conversion';
import { Result } from '../models/Result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('SelectFistCoinId') public selectFistCoin: SelectComponent
  @ViewChild('SelectSecondCoinId') public selectSecondCoin: SelectComponent

  public fistCoins: Coins[];
  public secondCoins: Coins[];
  private brazilianRealId: any = 0;
  public bodyConvert: Conversion;
  listaAdd: Array<Coins> = [];
  sourceValue: any = 0;
  valueTo: any = 0;
  totalResult: string;
  totalCheio: number;
  amount: any;
  descriptionValue: string;
  descriptionTotal: string;

  constructor(private externalService: ExternalService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getFistCoins();
  }

  getFistCoins(): void {
    this.externalService.ObterCoins()
      .subscribe(
        restItems => {
          this.fistCoins = restItems;
          this.fistCoins.forEach(item => {
            if (item.initial === 'BRL') { this.brazilianRealId = item.initial; }
            this.selectFistCoin.itemObjects.push(new SelectItem({ id: item.initial, text: item.initial + ' - ' + item.description }));
          });
        }
      )
  }

  selectedFistCoin(value: any): void {
    this.clearOptions();

    if (value.id !== this.brazilianRealId) {
      this.getBrazilianCoin();
    } else {
      this.getCoinsLessBrazilian();
    }
  }

  clearOptions(): void {
    this.selectSecondCoin.itemObjects = [];
    this.selectSecondCoin.active = [];
    this.listaAdd = [];
    this.sourceValue = 0;
    this.valueTo = 0;
    this.totalResult = "";
    this.totalCheio = 0;
    this.amount = 0;
    this.descriptionValue = "";
    this.descriptionTotal = "";
  }

  clearAllOptions(): void {
    this.clearOptions();
    this.selectFistCoin.itemObjects = [];
    this.selectFistCoin.active = [];
    this.getFistCoins();
  }

  gerarConversao(amount): void {
    if (this.selectFistCoin.active.length == 0){
      this.toastr.info('Selecione a primeira Moeda !!!');
      return;
    }

    if (this.selectSecondCoin.active.length == 0){
      this.toastr.info('Selecione a segunda Moeda !!!');
      return;
    }

    if (amount < 1){
      this.toastr.info('Valor Inválido !!!');
      return;
    }

    this.bodyConvert = new Conversion();

    this.bodyConvert.coinSource = this.selectFistCoin.activeOption.id;
    this.bodyConvert.coinTo = this.selectSecondCoin.activeOption.id;
    this.bodyConvert.currencySource = this.sourceValue;
    this.bodyConvert.currencyTo = this.valueTo;
    this.bodyConvert.amount = amount;

    this.externalService.ConvertToCurrency(this.bodyConvert)
      .subscribe(data => this.onProcessComplete(data))
  }

  onProcessComplete(resultado: Result): void {
    this.totalCheio = resultado.total;
    this.totalResult = resultado.totalConverted;
  }

  selectedSecondCoin(value: any): void {
    const coinSource = this.selectFistCoin.activeOption.id;
    const coinTo = this.selectSecondCoin.activeOption.id;

    this.gerComparativeCurrency(coinSource, coinTo);

    this.descriptionValue = "Valor em: " + this.selectFistCoin.activeOption.text;
    this.descriptionTotal = "Valor Total em: " + this.selectSecondCoin.activeOption.text;
  }

  removedFistCoin(value: any): void {
    this.clearOptions();
  }

  gerComparativeCurrency(coinSource, coinTo): void {
    this.externalService.ObterComparativeCurrency(coinSource, coinTo)
    .subscribe(data => {
      this.sourceValue = data.sourceValue,
      this.valueTo = data.value
    })
  }

  getBrazilianCoin(): void {
    this.externalService.ObterBrazilianCoin().subscribe(
      restItems => {
        this.listaAdd.push(restItems);
        this.listaAdd.forEach(item => {
          this.selectSecondCoin.itemObjects.push(new SelectItem({ id: item.initial, text: item.initial + ' - ' + item.description }));
        })
      }
    )
  }

  getCoinsLessBrazilian(): void {
    this.externalService.ObterCoins()
      .subscribe(
        restItems => {
          this.secondCoins = restItems;
          this.fistCoins.forEach(item => {
            if (item.initial !== 'BRL') {
               this.selectSecondCoin.itemObjects.push(new SelectItem({ id: item.initial, text: item.initial + ' - ' + item.description }));
               }
          });
        }
      )
  }
}
