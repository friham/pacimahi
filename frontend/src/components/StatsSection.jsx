import { useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useSettings } from '../hooks/useSettings';
import './StatsSection.css';

export default function StatsSection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.1 });
  const { settings } = useSettings();

  const periodLabel = settings.survey_period || 'Triwulan II Tahun 2026';

  const surveyCards = useMemo(() => [
    {
      abbr: 'IKM',
      title: 'INDEKS KEPUASAN MASYARAKAT',
      score: settings.survey_ikm_score || '3.97',
      grade: settings.survey_ikm_grade || 'A (SANGAT BAIK)'
    },
    {
      abbr: 'IPKP',
      title: 'INDEKS PERSEPSI KUALITAS PELAYANAN',
      score: settings.survey_ipkp_score || '3.97',
      grade: settings.survey_ipkp_grade || 'A (SANGAT BAIK)'
    },
    {
      abbr: 'IPAK',
      title: 'INDEKS PERSEPSI ANTI KORUPSI',
      score: settings.survey_ipak_score || '3.98',
      grade: settings.survey_ipak_grade || 'A (SANGAT BAIK)'
    }
  ], [settings]);

  return (
    <section className="stats-section" id="statistik">
      <div className="container">
        <div ref={headerRef} className="stats-section__header scroll-reveal">
          <h2 className="stats-section__main-title">LAPORAN SURVEI PA KOTA CIMAHI</h2>
          <div className="stats-section__sub-period">PERIODE {periodLabel.toUpperCase()}</div>
        </div>

        <div ref={gridRef} className="stats-section__grid scroll-reveal">
          {surveyCards.map((item, idx) => (
            <div
              key={item.abbr}
              className="survey-report-card"
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              <div className="survey-report-card__top">
                <div className="survey-report-card__tab">
                  {item.abbr}
                </div>
              </div>

              <div className="survey-report-card__title">
                {item.title}
              </div>

              <div className="survey-report-card__score">
                {item.score}
              </div>

              <div className="survey-report-card__grade">
                {item.grade.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
