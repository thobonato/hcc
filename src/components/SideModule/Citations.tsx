import { Button } from "@/components/ui/button";

interface Citation {
    id: number;
    title: string;
    subtitle: string;
    reference: string;
    doi?: string;
}

export const citationsData: Citation[] = [
    {
      id: 1,
      title: 'Basic Chemical Information & Properties',
      subtitle: 'IUPAC, molecular weight, functional groups, solubility, logP, pKa, etc.',
      reference: 'Müller, K., Faeh, C., & Diederich, F. (2007). Fluorine in pharmaceuticals: Looking beyond intuition. Science, 317(5846), 1881-1886.',
      doi: '10.1126/science.1131943'
    },
    {
      id: 2,
      title: 'Advanced Organic Chemistry',
      subtitle: 'Reaction mechanisms, synthesis, and applications.',
      reference: 'Smith, M. B., & March, J. (2007). March\'s Advanced Organic Chemistry: Reactions, Mechanisms, and Structure. John Wiley & Sons.',
      doi: '10.1002/9780470084960'
    },
    {
      id: 3,
      title: 'Principles of Biochemistry',
      subtitle: 'Structure and function of biomolecules, metabolism, and bioenergetics.',
      reference: 'Nelson, D. L., & Cox, M. M. (2008). Lehninger Principles of Biochemistry. Macmillan.',
      doi: '10.1007/978-1-4757-2085-3'
    },
    {
      id: 4,
      title: 'Inorganic Chemistry',
      subtitle: 'Coordination chemistry, organometallics, and bioinorganic chemistry.',
      reference: 'Miessler, G. L., Fischer, P. J., & Tarr, D. A. (2013). Inorganic Chemistry. Pearson.',
      doi: '10.1021/ed080p1471'
    },
    {
      id: 5,
      title: 'Physical Chemistry',
      subtitle: 'Thermodynamics, kinetics, quantum chemistry, and spectroscopy.',
      reference: 'Atkins, P., & de Paula, J. (2010). Physical Chemistry. Oxford University Press.',
      doi: '10.1021/ed084p1465'
    }
];

export const Citations = () => {
    return (
      <div className="px-4 py-2 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {citationsData.map((citation, index) => (
          <div key={citation.id}>
            <div className="p-4 bg-transparent rounded-lg space-y-2">
              <div className="flex items-start gap-3">
                <Button className="bg-fill-secondary rounded h-7 w-6">
                  {citation.id}
                </Button>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{citation.title}</h3>
                  <p className="text-text-primary text-sm">{citation.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-text-primary">{citation.reference}</p>
              {citation.doi && (
                <a 
                  href={`https://doi.org/${citation.doi}`}
                  className="text-sm text-text-primary underline block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://doi.org/{citation.doi}
                </a>
              )}
            </div>
            {index < citationsData.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </div>
    )
}
