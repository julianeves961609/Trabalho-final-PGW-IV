package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.FotoImovelModel;
import com.example.demo.services.FotoImovelService;

@RestController 
@RequestMapping("/fotos")
public class FotoImovelController {

    @Autowired
    private FotoImovelService service;

    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FotoImovelModel> salvar(
            @RequestParam("arquivo") MultipartFile arquivo,
            @RequestParam("imovelId") Integer imovelId) {

        try{
            if(arquivo.isEmpty()){
                return ResponseEntity.badRequest().build();
            }
            FotoImovelModel fotoImovelModel = service.salvar(arquivo, imovelId);

            return ResponseEntity.status(200).body(fotoImovelModel);

        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    //ATUALIZAR IMAGEM
    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@RequestBody FotoImovelModel model, @PathVariable Integer id) {
        model.setId(id);
        FotoImovelModel atualizado = service.update(model);
        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    //DELETAR IMAGEM
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    //DEFINIR IMAGEM DE CAPA
    @PutMapping("/{id}/capa")
    public ResponseEntity<Void> definirCapa(@PathVariable Integer id) {
        try {
            service.definirCapa(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).build();
        }
}

}