package cl.duoc.msConsultas.repository;

import cl.duoc.msConsultas.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    // Método útil para listar todas las consultas o dudas realizadas por un usuario específico
    List<Consulta> findByUsuarioId(Long usuarioId);
}