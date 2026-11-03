package com.example.demo.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.FotoImovelModel;
import com.example.demo.models.ImovelModel;
import com.example.demo.repositories.FotoImovelRepository;
import com.example.demo.repositories.ImovelRepository;

@Service 
public class FotoImovelService {

    @Autowired 
    private FotoImovelRepository fotoImovelRepository;

    @Autowired 
    private ImovelRepository imovelRepository;

    @Value ("${app.upload-dir}")
    private String uploadDir;
    
    public FotoImovelModel salvar(MultipartFile arquivo, Integer imovelId){
        //1- PROCURAR PRA VER SE EXISTE IMOVEL ASSOCIADO A FOTO

        ImovelModel imovel = imovelRepository.findById(imovelId).orElseThrow(() -> new RuntimeException("Imóvel não encontrado"));
        try{
            //2- criar o diretorio de uploads
            Path pasta = Paths.get(uploadDir, String.valueOf(imovelId));
            Files.createDirectories(pasta);

            //3- renomear e mover arquivo
            String nomeOriginal = StringUtils.cleanPath(arquivo.getOriginalFilename());
            String nomeFinal = UUID.randomUUID() + "_" + nomeOriginal;
            Path destino = pasta.resolve(nomeFinal);

            arquivo.transferTo(destino); // grava o arquivo em disco

            //4 criar o modelo e salvar
            FotoImovelModel model = new FotoImovelModel();
            model.setCaminho(destino.toString());
            model.setNomeArquivo(nomeFinal);
            model.setImovel(imovel);

            fotoImovelRepository.save(model);
            
            return model;
        }       
        catch(IOException e){
            throw new RuntimeException("Erro ao salvar o arquivo", e);
        }
    }

    //atualizar
    public FotoImovelModel update(FotoImovelModel model) {
        try {
            if(fotoImovelRepository.existsById(model.getId())){
                return fotoImovelRepository.save(model);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    //delete
    public void delete(Integer id) {
        fotoImovelRepository.deleteById(id);
    }

    //deixar a imagem em destaque (capa)
    @Transactional
    public FotoImovelModel definirCapa(Integer fotoId) {
        FotoImovelModel foto = fotoImovelRepository.findById(fotoId)
                .orElseThrow(() -> new RuntimeException("Foto não encontrada"));

        // desmarca todas as fotos do mesmo imóvel
        List<FotoImovelModel> fotos = fotoImovelRepository.findByImovelId(foto.getImovel().getId());
        for (FotoImovelModel f : fotos) {
            f.setCapa(false);
        }

        // marca só a escolhida
        foto.setCapa(true);

        fotoImovelRepository.saveAll(fotos);
        return foto;
    }
}