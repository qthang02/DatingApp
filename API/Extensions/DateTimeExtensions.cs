namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly bod)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var age = today.Year - bod.Year;

        if (bod > today.AddYears(-age)) age--;

        return age;
    }
}