package cl.duoc.msConsultas.service;

import cl.duoc.msConsultas.model.Consulta;
import cl.duoc.msConsultas.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    public List<Consulta> listarTodas() {
        return consultaRepository.findAll();
    }

    public List<Consulta> listarPorUsuario(Long usuarioId) {
        return consultaRepository.findByUsuarioId(usuarioId);
    }

    public Optional<Consulta> buscarPorId(Long id) {
        return consultaRepository.findById(id);
    }

    public Consulta guardar(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    public Consulta actualizar(Long id, Consulta consultaDetalles) {
        return consultaRepository.findById(id).map(consulta -> {
            consulta.setUsuarioId(consultaDetalles.getUsuarioId());
            consulta.setAsunto(consultaDetalles.getAsunto());
            consulta.setMensaje(consultaDetalles.getMensaje());
            consulta.setRespuesta(consultaDetalles.getRespuesta());
            return consultaRepository.save(consulta);
        }).orElseGet(() -> {
            consultaDetalles.setId(id);
            return consultaRepository.save(consultaDetalles);
        });
    }

    public void eliminar(Long id) {
        consultaRepository.deleteById(id);
    }
}
