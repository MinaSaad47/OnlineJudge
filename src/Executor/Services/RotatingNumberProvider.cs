namespace OnlineJudge.Executor;

public class RotatingNumberProvider
{
    private const int _maxNumber = 1000;
    private int _currentNumber;

    public int GetNextNumber()
    {
        var nextNumber = Interlocked.Increment(ref _currentNumber) % _maxNumber;

        if (nextNumber == 0) nextNumber = _maxNumber;

        return nextNumber;
    }
}