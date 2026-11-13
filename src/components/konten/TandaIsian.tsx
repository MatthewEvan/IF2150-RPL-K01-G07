export function JudulWajib({ teks }: { teks: string }) {
  return (
    <>
      {teks}
      <span className="ml-0.5 text-danger" aria-hidden="true">
        *
      </span>
    </>
  );
}

export function PesanGalat({ id, galat }: { id: string; galat?: string }) {
  if (!galat) return null;
  return (
    <p id={id} className="text-xs font-medium text-danger">
      {galat}
    </p>
  );
}
