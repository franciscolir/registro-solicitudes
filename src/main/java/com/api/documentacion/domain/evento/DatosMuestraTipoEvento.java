package com.api.documentacion.domain.evento;

public class DatosMuestraTipoEvento{

       private String tipo;



    public DatosMuestraTipoEvento(TipoEvento tipo) {
        this.tipo = tipo.name(); // Convertir el enum a su representación en string
    }

    public String getTipoEvento() {
        return tipo;
    }

    public void setTipoEvento(String tipo) {
        this.tipo = tipo;
    }
}
