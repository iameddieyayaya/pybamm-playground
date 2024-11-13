import pybamm

def run_simulation(params):
    print("PyBaMM is successfully imported")
    
    # model = pybamm.lithium_ion.DFN()  # Doyle-Fuller-Newman model
    # sim = pybamm.Simulation(model)
    # sim.solve([0, 3600])  # solve for 1 hour
    # sim.plot()

run_simulation(None)