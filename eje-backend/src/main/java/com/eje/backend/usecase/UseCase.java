package com.eje.backend.usecase;

public interface UseCase<INPUT, OUTPUT> {
    OUTPUT execute(INPUT input);
}
