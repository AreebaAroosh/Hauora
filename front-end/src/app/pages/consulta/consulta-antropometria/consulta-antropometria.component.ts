import { Grupo } from './../../../shared/model/grupo.model';
import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { Composicao } from './../../../shared/model/composicao.model';
import { ConsultaService } from '../consulta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaAnamneseModalComponent } from './consulta-anamnese-modal/consulta-anamnese-modal.component';
import { ConsultaGruposModalComponent } from './consulta-grupos-modal/consulta-grupo-modal.component';


@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {
    pacienteSelecionado: any;
    selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];
    listaDeClientesBusca: Cliente[];

    peso: number;
    altura: number;
    gordura: number;
    imc: number;
    pesoIdeal: number;

    refeicaoSelecionada: string;
    imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
    imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
    imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
    imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
    imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';

    composicao_cafe_da_manha: Composicao[] = [];
    composicao_lanche_da_manha: Composicao[] = [];
    composicao_almoco: Composicao[] = [];
    composicao_lanche: Composicao[] = [];
    composicao_janta: Composicao[] = [];
    lista_composicao_selecionada: Composicao[] = [];

    grupos: Grupo[];
    porcoes: string;
    grupoSelecionadoId: string;

    constructor(private consultaService: ConsultaService, private modalService: NgbModal) { }

    ngOnInit() {
        this.selecionouPaciente = false;
        this.seleciouTipoRefeicao('CAFE_DA_MANHA');
        this.getGrupos();
    }

    buscarPacientes(nomePaciente) {
      this.consultaService.getClientes(nomePaciente)
              .subscribe(
                  (listaDeClientesBusca: Cliente[]) => {
                      this.listaDeClientesBusca = listaDeClientesBusca;
                  },
              );
    }

    usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(id)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                      this.selecionouPaciente = true;
                  },
              );
    }

    cancelaAnamnese() {
        if (confirm('Fazendo isso você perdera todos os dados da consulta')) {
            this.selecionouPaciente = false;
        } else {
        }
    }

    showModalAnamnese(id) {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaAnamneseModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';
        activeModal.componentInstance.userId = id;
    }

    showGruposModal() {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaGruposModalComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';

    }

    calculaIMC() {
        if (this.peso != null) {
            if (this.altura != null) {
               this.imc = this.peso / ( this.altura * this.altura );
            }
        }
    }

    seleciouTipoRefeicao(tipoRefeicao) {
        this.alterarIconeRefeicao(tipoRefeicao);
        this.refeicaoSelecionada = tipoRefeicao;
    }

    // Pega o tipo de refeição, seta todos os icones para a cor padrão e
    // coloca somente o item selecionado na cor
    alterarIconeRefeicao(tipoRefeicao) {
        this.imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIcon.png';
        this.imagem_lanche_da_manha = 'assets/images/mealIcons/snackIcon.png';
        this.imagem_almoco = 'assets/images/mealIcons/lunchIcon.png';
        this.imagem_lanche = 'assets/images/mealIcons/snackIcon.png';
        this.imagem_janta = 'assets/images/mealIcons/dinnerIcon.png';
        if (tipoRefeicao === 'CAFE_DA_MANHA') {
            this.imagem_cafe_da_manha = 'assets/images/mealIcons/breakfastIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_cafe_da_manha;
        }
        if (tipoRefeicao === 'LANCHE_DA_MANHA') {
            this.imagem_lanche_da_manha = 'assets/images/mealIcons/snackIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_lanche_da_manha;
        }
        if (tipoRefeicao === 'ALMOCO') {
            this.imagem_almoco = 'assets/images/mealIcons/lunchIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_almoco;
        }
        if (tipoRefeicao === 'LANCHE') {
            this.imagem_lanche = 'assets/images/mealIcons/snackIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_lanche;
        }
        if (tipoRefeicao === 'JANTA') {
            this.imagem_janta = 'assets/images/mealIcons/dinnerIconBlue.png';
            this.lista_composicao_selecionada = this.composicao_janta;
        }
    }

    getGrupos() {
        this.consultaService.getGrupos()
        .subscribe(
            (grupo: Grupo[]) => {
                this.grupos = grupo;
            },
        );
    }

    addComposicao() {
        // tslint:disable-next-line:prefer-const
        let composicaoTemp = new Composicao({grupo: this.grupoSelecionadoId, quantidade: this.porcoes});
        this.checkTipoRefeicaoEArmazena(composicaoTemp);


        this.grupoSelecionadoId = null;
        this.porcoes = null;
    }

    checkTipoRefeicaoEArmazena(composicao) {
        if (this.refeicaoSelecionada === 'CAFE_DA_MANHA') {
            this.composicao_cafe_da_manha.push(composicao);
        }
        if (this.refeicaoSelecionada === 'LANCHE_DA_MANHA') {
            this.composicao_lanche_da_manha.push(composicao);
        }
        if (this.refeicaoSelecionada === 'ALMOCO') {
            this.composicao_almoco.push(composicao);
        }
        if (this.refeicaoSelecionada === 'LANCHE') {
            this.composicao_lanche.push(composicao);
        }
        if (this.refeicaoSelecionada === 'JANTA') {
            this.composicao_janta.push(composicao);
        }
    }

    getTituloGrupoPorId(grupoId) {
        return this.grupos.find(x => x._id === grupoId).titulo;
    }

    deletarComposicao(composicao) {
        if (this.refeicaoSelecionada === 'CAFE_DA_MANHA') {
            const index: number = (this.composicao_cafe_da_manha.indexOf(composicao)) - 1;
            this.composicao_cafe_da_manha.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'LANCHE_DA_MANHA') {
            const index: number = (this.composicao_lanche_da_manha.indexOf(composicao)) - 1;
            this.composicao_lanche_da_manha.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'ALMOCO') {
            const index: number = (this.composicao_almoco.indexOf(composicao)) - 1;
            this.composicao_almoco.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'LANCHE') {
            const index: number = (this.composicao_lanche.indexOf(composicao)) - 1;
            this.composicao_lanche.splice(index, 1);
        }
        if (this.refeicaoSelecionada === 'JANTA') {
            const index: number = (this.composicao_janta.indexOf(composicao)) - 1;
            this.composicao_janta.splice(index, 1);
        }
    }

}
