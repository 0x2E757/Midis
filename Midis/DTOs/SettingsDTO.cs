using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Midis.Entities
{
    public class SettingsDTO
    {
        [Required(ErrorMessage = "Field is required")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Value must be positive integer")]
        public string? MaximumFileSize { get; set; }

        [Required(ErrorMessage = "Field is required")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Value must be positive integer")]
        public string? MinimumImageWidth { get; set; }

        [Required(ErrorMessage = "Field is required")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Value must be positive integer")]
        public string? MinimumImageHeight { get; set; }

        [Required(ErrorMessage = "Field is required")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Value must be positive integer")]
        public string? MaximumImageWidth { get; set; }

        [Required(ErrorMessage = "Field is required")]
        [RegularExpression("([0-9]+)", ErrorMessage = "Value must be positive integer")]
        public string? MaximumImageHeight { get; set; }

        [Required(ErrorMessage = "Field is required")]
        public List<string>? AllowedExtensions { get; set; }
    }
}
