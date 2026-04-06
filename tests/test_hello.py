from src.hello import greet, add


def test_greet_default():
    assert greet() == "Hello, World!"


def test_greet_with_name():
    assert greet("Jagger") == "Hello, Jagger!"


def test_add():
    assert add(1, 2) == 3


def test_add_negative():
    assert add(-5, 3) == -2
