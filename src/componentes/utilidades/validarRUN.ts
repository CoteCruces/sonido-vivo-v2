// Validación del RUN chileno
export function validarRUN(run: string): boolean {
    const limpio = run
        .replace(/[.\-\s]/g, "")
        .toUpperCase();

    if (!/^[0-9]{7,8}[0-9K]$/.test(limpio)) {
        return false;
    }

    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7
            ? 2
            : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const dvCalculado =
        resultado === 11 ? "0" :
        resultado === 10 ? "K" :
        String(resultado);

    return dv === dvCalculado;
}
