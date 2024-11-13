import pybamm

def run_simulation(params, check_already_exists=False):
    """
    Function to run the PyBaMM battery simulation based on input parameters.
    :param params: Dictionary containing simulation parameters.
    :return: Results dictionary (voltage, capacity, etc.)
    """

    battery_model = pybamm.lithium_ion.DFN()
    param = pybamm.ParameterValues("Chen2020")
    
    param.update(params, check_already_exists=check_already_exists)

    sim = pybamm.Simulation(battery_model, parameter_values=param)
    sim.solve([0, 3600])

    results = {
        "voltage": sim.solution["Terminal voltage [V]"].entries.tolist(),
        "time": sim.solution["Time [s]"].entries.tolist(),
    }

    return results