import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SucursalesService } from 'src/app/services/sucursales.service';
//SUCURSALES
import { Sucursales } from 'src/app/models/sucursales.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ SucursalesService, UsuarioService ]
})
export class DashboardComponent implements OnInit {

  public token;

  //SUCURSALES
  public sucursalModelGet: Sucursales;
  public sucursalModelPost: Sucursales;
  public sucursalModelId: Sucursales;

  constructor(private _sucursalesService: SucursalesService, private _usuarioService: UsuarioService) {
    this.sucursalModelPost = new Sucursales('','', '','');
    this.sucursalModelId = new Sucursales('','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales(){
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.sucursalModelGet = response.sucursales;
        console.log(response);
        console.log(this.sucursalModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getSucursalId(idSucursal){
    this._sucursalesService.obtenerSucursalId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalModelId = response.sucursales;
        console.log(response);
        console.log(this.sucursalModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postSucursales(){
    this._sucursalesService.agregarSucursal(this.sucursalModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  deleteSucursal(idSucursal) {
    this._sucursalesService.eliminarSucursal(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putSucursales(){
    this._sucursalesService.editarEmpresa(this.sucursalModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
}
