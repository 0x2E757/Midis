namespace Midis.Models
{
    public class SettingModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public string? StringValue { get; set; }
        public int? IntegerValue { get; set; }
    }
}
