package io.egen.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;


@Entity
@NamedQueries({
        @NamedQuery(
                        name="Alert.fetchHighAlertsWithinLast2Hours",
                        query="select a from Alert a where a.priority='HIGH' and a.timestamp<=NOW()and a.timestamp>=:pastTime order by a.timestamp desc"
        ),
        @NamedQuery(
                name="Alert.fetchByVin",
                query="select a from Alert a where a.vin=:paramVin"
        )
})
public class Alert {

    @Id
    private String id;

    @ManyToOne
    private Reading reading;

    private String vin;
    private Timestamp timestamp;

    private String priority;


    public Alert() {
        this.id = UUID.randomUUID()
                .toString();
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Reading getReading() {
        return reading;
    }

    public void setReading(Reading reading) {
        this.reading = reading;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
