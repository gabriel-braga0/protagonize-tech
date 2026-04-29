using System.ComponentModel.DataAnnotations;

namespace TarefasApi.Models
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título não pode exceder 100 caracteres.")]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "A descrição não pode exceder 500 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        [RegularExpression("^(Pendente|Concluída)$", ErrorMessage = "O status deve ser 'Pendente' ou 'Concluída'.")]
        public string Status { get; set; } = "Pendente";

        public DateTime DataCriacao { get; set; } = DateTime.Now;
    }
}
