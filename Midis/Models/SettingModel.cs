namespace Midis.Models
{
    public class SettingModel
    {
        public required string Name { get; set; }
        public required string ValueType { get; set; }
        public string? StringValue { get; set; }
        public int? IntegerValue { get; set; }
    }
}
