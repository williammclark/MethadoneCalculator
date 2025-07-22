import math

FIRST_NUMERATOR = 100
SECOND_NUMERATOR = 310
NORMALIZING_FACTOR = 21
OFFSET_CONSTANT = 5.7
SCALING_FACTOR = 3
SINE_NUMERATOR = 90
EXPONENT = 100

# Fudin et al. Methadone Conversion
class MethadoneConverter:
    """
    Calculate a methadone dose based on a given dose using the formula from Fudin et al.

    Parameters
    ----------
    values : float
        The dose of Morphine (mg/day) to be converted.

    Returns
    -------
    float
        The Methadone Equivalent (mg/day).

    Raises
    ------
    ValueError
        If the dose is not a positive number.

    References
    ----------
    Fudin J, Marcoux M, Fudin J. Mathematical Model For Methadone Conversion Examined. Pract Pain Manag. 2012;12(8).
    """
    def convert(self, dose: float) -> float:
        if dose <= 0.0:
            raise ValueError("Input must be non-negative")
        a = dose
        b = NORMALIZING_FACTOR
        c = OFFSET_CONSTANT
        d = SCALING_FACTOR
        e = SINE_NUMERATOR
        f = EXPONENT
        g = SECOND_NUMERATOR
        h = FIRST_NUMERATOR

        term1 = math.sin(e / ((f / a)**h + 1))
        term2 = math.sin(e / ((g / a)**h + 1))

        result = (a / b) * (c - d * term1 - term2)
        return result