package io.egen.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Tire {

    @Id
    private String id;
    private long frontLeft;
    private long frontRight;
    private long rearLeft;
    private long rearRight;

    public Tire() {
        this.id = UUID.randomUUID()
                .toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getFrontLeft() {
        return frontLeft;
    }

    public void setFrontLeft(long frontLeft) {
        this.frontLeft = frontLeft;
    }

    public long getFrontRight() {
        return frontRight;
    }

    public void setFrontRight(long frontRight) {
        this.frontRight = frontRight;
    }

    public long getRearLeft() {
        return rearLeft;
    }

    public void setRearLeft(long rearLeft) {
        this.rearLeft = rearLeft;
    }

    public long getRearRight() {
        return rearRight;
    }

    public void setRearRight(long rearRight) {
        this.rearRight = rearRight;
    }
}
