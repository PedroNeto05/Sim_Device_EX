import numpy as np


def generate_random_matrix(rows: int, cols: int) -> np.ndarray:
    return np.random.rand(rows, cols)


if __name__ == "__main__":
    rows = 4
    cols = 4
    random_matrix = generate_random_matrix(rows, cols)
    print(np.linalg.det(random_matrix)**2)
