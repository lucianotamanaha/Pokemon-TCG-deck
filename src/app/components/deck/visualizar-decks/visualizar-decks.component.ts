import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from 'src/app/models/carta';
import { Deck } from 'src/app/models/deck';
import { ApiPokemonService } from 'src/app/services/apipokemon.service';
import { DeckService } from 'src/app/services/deck.service';
import { NotificationService } from 'src/app/services/notification.service';

import { isNullOrUndefined } from 'is-what';

@Component({
  selector: 'visualizar-decks',
  templateUrl: './visualizar-decks.component.html',
  styleUrls: ['./visualizar-decks.component.css']
})
export class VisualizarDecksComponent implements OnInit, OnDestroy {
  public deck: Deck = new Deck();
  public cartas: Carta[];
  public pagina: number = 1;
  public pesquisa: string = "";
  private quantidadePagina: number = 20;
  private dialogSub: any;
  private apiPokemonSub: any;

  constructor(private apiPokemonService: ApiPokemonService,
    private deckService: DeckService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.deck = this.deckService.buscarPorId(id);
    }

    this.buscarPaginado();
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.apiPokemonSub?.unsubscribe();
  }

  private buscarPaginado(): void {
    this.apiPokemonSub = this.apiPokemonService.buscarTodasCartasPaginado(this.pagina, this.quantidadePagina).subscribe(result => {
      this.cartas = result.cards;
    });
  }

  public retornarQuantidadeTotalCartas(): number {
    return this.deck.cartas.reduce((anterior, atual) => +anterior + +atual.quantidade, 0);
  }

  public retornarQuantidadeCartasPorNome(nome: string): number {
    const cartas = this.deck.cartas.filter(carta => carta.name === nome);
    return cartas.map(carta => carta.quantidade).reduce((anterior, atual) => +anterior + +atual, 0);
  }


  private verificarCartaAdicionada(novaCarta: Carta): boolean {
    return !isNullOrUndefined(this.deck.cartas.find(carta => carta.id === novaCarta.id));
  }

  public cartaSelecionada(carta: Carta): string {
    return this.verificarCartaAdicionada(carta) ? "carta-selecionada" : ""; 
  }
}