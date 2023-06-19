    public class Vacation
    {
        public int VacationId { get; set; }
        public int EmployeeId { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Employee Employee { get; set; }
    }